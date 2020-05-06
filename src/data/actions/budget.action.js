import {
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,

    BUDGETED_CATEGORIES_GET_REQUEST,
BUDGETED_CATEGORIES_GET_SUCCESS,
BUDGETED_CATEGORIES_GET_FAILURE,
} from '../../data/constants/index';

import API from '../fetch/index';


 export const fetchBudget = (id) => async (dispatch) => { //funckcja ktora zwraca funkcje

    // const promise = API.budget.fetchBudget(id);


    //dispatch... akcjebudget_request
    dispatch({
        type: BUDGET_GET_REQUEST,
    })
    //wykonac request do api
    try {
        console.log(id,"id")
        
        const response = await API.budget.fetchBudget(id); 
        const data = await response.json() //json rowniez zwraca promise dlatego trzeba na niego zaczekac uzywajac await
        dispatch({
            type: BUDGET_GET_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: BUDGET_GET_FAILURE,
        })
    }
 


    //dispatch akcje budget_success  + przekazac dane z requestu,


}

export const fetchBudgetCategories = (id) => async (dispatch) => {
    //dispatch... akcjebudget_request
    dispatch({
        type: BUDGETED_CATEGORIES_GET_REQUEST,
    })
    //wykonac request do api
    try {
        console.log(id,"id")
        
        const response = await API.budget.fetchBudgetedCategories(id); 
        const data = await response.json() //json rowniez zwraca promise dlatego trzeba na niego zaczekac uzywajac await
        dispatch({
            type: BUDGETED_CATEGORIES_GET_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: BUDGETED_CATEGORIES_GET_FAILURE,
        })
    }
}