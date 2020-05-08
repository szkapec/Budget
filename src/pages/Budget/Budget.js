import React, {useEffect, useMemo} from 'react'
import { connect } from 'react-redux';
import {fetchBudget, fetchBudgetCategories} from '../../data/actions/budget.action';
import { fetchAllCategories} from '../../data/actions/common.action';
import { Grid } from './Budget.css';
import { LoadingIndicator } from 'components';
import BudgetCategoryList from './components/BudgetCategoryList/index';
import BudgetTransactionList from './components/BudgetTransactionList/index'
function Budget({fetchBudget,fetchBudgetCategories, fetchAllCategories, commonState, budgetState}) {
        useEffect(()=> {
          fetchBudget(1);
          fetchBudgetCategories(1);
          fetchAllCategories();
        }, [fetchBudget,fetchBudgetCategories, fetchAllCategories])
        const isLoaded = useMemo(() =>  (!!commonState && Object.keys(commonState).length===0) &&  (!!budgetState && Object.keys(budgetState).length===0), [commonState,budgetState] )

    return (
        <Grid>
            <section>
                {isLoaded ? <BudgetCategoryList/> : <LoadingIndicator/>}
            </section>
            <section>
                {isLoaded ? <BudgetTransactionList/> : <LoadingIndicator/>}
            </section>
        </Grid>
    )
}

export default connect(state=> { //state to common i budget //funkcja connect dispaczuje xD
    return {
      budget: state.budget.budget, //wyciaganie wlasciwosci do propsa
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
  }}, {
      fetchBudget, //funcja asynchroniczna 
      fetchBudgetCategories,
      fetchAllCategories,
    })(Budget)