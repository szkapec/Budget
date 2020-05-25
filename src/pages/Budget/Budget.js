import React, {useEffect, useMemo} from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchBudget, fetchBudgetCategories , addTransaction} from '../../data/actions/budget.action';
import { fetchAllCategories} from '../../data/actions/common.action';
import { Grid } from './Budget.css';
import { LoadingIndicator, Modal, Button } from 'components';
import BudgetCategoryList from './components/BudgetCategoryList/index';
import BudgetTransactionList from './components/BudgetTransactionList/index';
import AddTransactionForm from './components/AddTransactionForm/index';


function Budget({fetchBudget,fetchBudgetCategories, fetchAllCategories, commonState, budgetState, allCategories, addTransaction, budget}) {
        useEffect(()=> {
          fetchBudget(1);
          fetchBudgetCategories(1);
          fetchAllCategories();
        }, [fetchBudget,fetchBudgetCategories, fetchAllCategories])
        const isLoaded = useMemo(() =>  (!!commonState && Object.keys(commonState).length===0) &&  (!!budgetState && Object.keys(budgetState).length===0), [commonState,budgetState] )

        const history = useHistory();

        const handleSubmit = (values) => {
            addTransaction({
                budgetId: budget.id,
                data: values
            }).then(() => {
                history.goBack();
            })

        }

    return (
        <>
        <Grid>
           
            <section>
                <>
                
                {isLoaded ? <BudgetCategoryList/> : <LoadingIndicator/>}
                </>
            </section>
            <section>
                <Button to="/budget/transactions/new">Add new transactions</Button>
                {isLoaded ? <BudgetTransactionList/> : <LoadingIndicator/>}
            </section>
        </Grid>

            <Switch>
                <Route exact path="/budget/transactions/new">
                    <Modal>
                        Modals
                         <AddTransactionForm categories={allCategories} groupCategoriesBy='parentCategory.name' onSubmit={handleSubmit}></AddTransactionForm>
                    </Modal>
                </Route>
            </Switch>
        </>
    )
}

export default connect(state=> { //state to common i budget //funkcja connect dispaczuje xD
    return {
      budget: state.budget.budget, //wyciaganie wlasciwosci do propsa
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
      allCategories: state.common.allCategories,
      
  }}, {
      fetchBudget, //funcja asynchroniczna 
      fetchBudgetCategories,
      fetchAllCategories,
      addTransaction,
    })(Budget)