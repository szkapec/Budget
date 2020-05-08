import {
    BUDGET_GET,
    // BUDGET_GET_REQUEST,
    // BUDGET_GET_SUCCESS,
    // BUDGET_GET_FAILURE,

//     BUDGETED_CATEGORIES_GET_REQUEST,
// BUDGETED_CATEGORIES_GET_SUCCESS,
// BUDGETED_CATEGORIES_GET_FAILURE,
BUDGETED_CATEGORIES_GET,
SET_SELECTED_PARENT_CATEGORY_ID,
} from '../../data/constants/index';

import API from '../fetch/index';


 export const fetchBudget = (id) => { //funckcja ktora zwraca funkcje

    const promise = API.budget.fetchBudget(id);
    return{ //wysylamy type oraz promise
        type: BUDGET_GET,
        promise
    }
}


export const fetchBudgetCategories = (id) => {
   
   const promise = API.budget.fetchBudgetedCategories(id);
   return {
       type: BUDGETED_CATEGORIES_GET,
       promise,
   }
}
export const selectParentCategory = (id) => { //zwraca do reduxa
    return {
        type: SET_SELECTED_PARENT_CATEGORY_ID,
        payload: id,
    }
}
   
   //tak bylo wczesniej przed zrobieniem milddleware
   
    //dispatch... akcjebudget_request
    // dispatch({
    //     type: BUDGETED_CATEGORIES_GET_REQUEST,
    // })
    // //wykonac request do api
    // try {
    //     console.log(id,"id")
        
    //     const response = await API.budget.fetchBudgetedCategories(id); 
    //     const data = await response.json() //json rowniez zwraca promise dlatego trzeba na niego zaczekac uzywajac await
    //     dispatch({
    //         type: BUDGETED_CATEGORIES_GET_SUCCESS,
    //         payload: data,
    //     })
    // } catch (error) {
    //     dispatch({
    //         type: BUDGETED_CATEGORIES_GET_FAILURE,
    //     })
    // }