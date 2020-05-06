import React from 'react'
import {connect} from 'react-redux';
import { groupBy } from 'lodash';
import { ToggleableList } from 'components';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';  
 function BudgetCategoryList({budgetedCategories,allCategories}) {
const budgetedCategoriesByParent = groupBy(budgetedCategories, 
    item => allCategories.find(category => category.id ===item.categoryId).parentCategory.name) //2 przyjmuje w jaki sposob mamy pogrupowac elementy

    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Triggers: ({onClick}) => (
            <ParentCategory
            name={parentName}
            onClick={() => onClick(parentName)}
            />
        ),
        children: categories.map(budgetCategory => {
            categories.name = allCategories.find(category => category.id === budgetCategory.categoryId)
            const {name} = categories.name;
            console.log(name)
            return(
                <CategoryItem name={name} key={name}/>
            )
        }),
    }))
        console.log(listItems)
    return (
        <div>
            <ToggleableList items={listItems}/>
        </div>
    )
}
export default connect(state => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
}))(BudgetCategoryList); //laczymy komponent z reduxem