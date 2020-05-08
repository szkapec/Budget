import React from 'react'
import { List, ListItem } from './BudgetTransactionList.css';
import  { connect} from 'react-redux';
import { groupBy} from 'lodash';
import { formatCurrency, formatDate } from '../../../../style/index'
import { useTranslation } from 'react-i18next';


 function BudgetTransaction({ transactions,allCategories, selectedParentCategoryId }) {
    const { t, i18n } = useTranslation();


    const filterTransactionBySelectedParentCategory = (() => {
        if(typeof selectedParentCategoryId === 'undefined'){
            return transactions
        }
        return transactions.filter(transaction => {
            try {
                const category = allCategories.find(category => category.id===transaction.categoryId);
                
                const parentCategoryName = category.parentCategory.name;
    
                return parentCategoryName === selectedParentCategoryId
            } catch (error) {
                return false;
            }
        });
    })();


        
    
    const groupedTransactions = groupBy(filterTransactionBySelectedParentCategory, pojedynczy => new Date(pojedynczy.date).getUTCDate())
    
    return (
        <List>
                {Object.entries(groupedTransactions).map(([key, transactions]) => (
                   <li key={key}>
                        <ul>
                        {transactions.map((transaction, key) => (
                            <ListItem key={key}>
                                <div>{transaction.description}</div>
                                <div>{formatCurrency(transaction.amount, i18n.language)}</div>
                                <div>{formatDate(transaction.date)}</div>
                                <div>{(allCategories.find(category => category.id===transaction.categoryId) || {}).name}</div>

                            </ListItem>
                        ))}
                    </ul>
                   </li>
                ))}
            <ul>
                <li></li>
            </ul>
        </List>
    )
}
export default connect(state => ({
    transactions: state.budget.budget.transactions,
    allCategories: state.common.allCategories,
    selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransaction)