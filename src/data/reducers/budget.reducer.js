import {
    BUDGET_GET,
    BUDGET_GET_REQUEST,
    BUDGET_GET_SUCCESS,
    BUDGET_GET_FAILURE,

    BUDGETED_CATEGORIES_GET_REQUEST,
    BUDGETED_CATEGORIES_GET_SUCCESS,
    BUDGETED_CATEGORIES_GET_FAILURE,
    LOADING_STATES,
    
} from '../../data/constants/index'


const initialState = {
    loadingState: {},
    budget: {},
    budgetedCategories: [],
}

function budget(state = initialState, action) {
console.log(action, 'asction')
    const newLoadingState = {...state.loadingState};


    switch(action.type) {
        case BUDGET_GET_REQUEST: 
            return {
                ...state, 
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGET_GET_SUCCESS:
            delete newLoadingState.BUDGET_GET_REQUEST;
            return {
                ...state, budget: action.payload,
                loadingState: newLoadingState,
            }
        case BUDGET_GET_FAILURE: //request do api sie skonczyl
            delete newLoadingState.BUDGET_GET_REQUEST;
            return {
                ...state, 
                budget: {},
                loadingState: newLoadingState,
            }



        
            case BUDGETED_CATEGORIES_GET_REQUEST: 
            return {
                ...state, 
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case BUDGETED_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;
            return {
                ...state,
                 budgetedCategories: action.payload,
                loadingState: newLoadingState,
            }
            
        case BUDGETED_CATEGORIES_GET_FAILURE: //request do api sie skonczyl
            delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;
            return {
                ...state, 
                budgetedCategories: [],
                loadingState: newLoadingState,
            }

        default:
            return state;
    }
}

export default budget;