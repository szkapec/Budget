import React, {useRef, useMemo, useCallback} from 'react'
import {connect} from 'react-redux';
import { groupBy } from 'lodash';
import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';  
import {useTranslation} from 'react-i18next';
import "styled-components/macro";
import { selectParentCategory } from '../../../../data/actions/budget.action';

 function BudgetCategoryList({budgetedCategories,allCategories ,budget, selectParentCategory}) {
  

    const { t } = useTranslation();
    const handleClickParentCategoryRef = useRef(null)
    
    
    const budgetedCategoriesByParent = useMemo(() =>  groupBy(budgetedCategories, 
    item => allCategories.find(category => category.id ===item.categoryId).parentCategory.name
    ), //2 przyjmuje w jaki sposob mamy pogrupowac elementy
    [budgetedCategories,allCategories]
    );

    const handleClearParentCategorySelect = useCallback(() => {
        selectParentCategory();
        handleClickParentCategoryRef.current()
    },
    [handleClickParentCategoryRef,selectParentCategory]
    );

    const handleSelectRestParentCategories = useCallback(() => {
        selectParentCategory(null);
        handleClickParentCategoryRef.current()
    },
    [handleClickParentCategoryRef,selectParentCategory]
    );


    const listItems = useMemo(() => 
        Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Triggers: ({onClick}) => (
            <ParentCategory
            name={parentName}
            onClick={() => {
                onClick(parentName)
                selectParentCategory(parentName)
            }}
            categories={categories}
            transactions={budget.transactions}
            />
        ),
        children: categories.map(budgetCategory => {
            categories.name = allCategories.find(category => category.id === budgetCategory.categoryId)
            const {name} = categories.name;
          
            return(
                <CategoryItem 
                name={name} 
                key={name}
                item={budgetCategory}
                transactions={budget.transactions}
                />
            )
        }),
    })), [allCategories,budget.transactions, budgetedCategoriesByParent, selectParentCategory]
    );
    
    const totalSpent = useMemo(
        () => budget.transactions.reduce((acc, transaction) => acc+transaction.amount,0),
         [budget.transactions]
    );

    const restToSpent = useMemo(
        () => budget.totalAmount - totalSpent,
        [budget.totalAmount, totalSpent]
    );

    const amountTaken = useMemo(()=> budgetedCategories.reduce((acc,budgetedCategory) => {
        const categoryTransactions = budget.transactions.filter(transaction => transaction.categoryId===budgetedCategory.id);
        const categoryExpenses = categoryTransactions.reduce((acc,trans) => acc+trans.amount,0);

        return acc + Math.max(categoryExpenses, budgetedCategory.budget); //jezeli wieksze bd category to zwroci zategory jesli jinie to budget
    },0), 
        [budgetedCategories,budget.transactions]
    );
    
    const notBudgetedTransaction = useMemo(()=>budget.transactions
        .filter(transaction => !budgetedCategories.find(budgetedCategory => budgetedCategory.id===transaction.categoryId)),
         [budgetedCategories, budget.transactions]
    );

    const notBudgetedExpenses = useMemo(()=>notBudgetedTransaction.reduce((acc, transaction) => acc+transaction.amount,0),
    [notBudgetedTransaction]
    );

    const availableForRestCategories = useMemo(() => budget.totalAmount - amountTaken - notBudgetedExpenses,
    [budget.totalAmount, amountTaken, notBudgetedExpenses]
    );
    


    if(budget.transactions===undefined) return <div>Błąd połączenia z bazą danych 404 :(</div>;


        return (
        <div>
            <div
                css={`
                    border-bottom: 5px solid ${({theme}) => theme.colors.grey.light};
                `}
            >
                <ParentCategory
                name={budget.name}
                amount={restToSpent}
                onClick={handleClearParentCategorySelect}
                />
            </div>

            <ToggleableList items={listItems}
                clickRef={handleClickParentCategoryRef}
            />
            <div
                css={`
                    border-top: 5px solid ${({theme}) => theme.colors.grey.light};
                `}
            >
                <ParentCategory
                name={t('Other categories')}
                amount={availableForRestCategories}
                onClick={handleSelectRestParentCategories}
                />
            </div>
        </div>
    )
}
export default connect(state => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget,
}), { selectParentCategory } ) (BudgetCategoryList); //laczymy komponent z reduxem