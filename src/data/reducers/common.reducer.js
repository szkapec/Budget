import {
    ALL_CATEGORIES_GET,
    ALL_CATEGORIES_GET_REQUEST,
    ALL_CATEGORIES_GET_SUCCESS,
    ALL_CATEGORIES_GET_FAILURE,
    LOADING_STATES,
} from '../../data/constants/index'


const initialState = {
    loadingState: {},
    allCategories: {},
}

function common(state = initialState, action) {
console.log(action.type)
    const newLoadingState = {...state.loadingState};


    switch(action.type) {
        case ALL_CATEGORIES_GET_REQUEST: 
            return {
                ...state, 
                loadingState: {
                    ...state.loadingState,
                    [action.type]: LOADING_STATES.LOADING,
                }
            }

        case ALL_CATEGORIES_GET_SUCCESS:
            delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;
            return {
                ...state,
                allCategories: action.payload,
                loadingState: newLoadingState,
            }
        case ALL_CATEGORIES_GET_FAILURE: //request do api sie skonczyl
            delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;
            return {
                ...state, 
                allCategories: {},
                loadingState: newLoadingState,
            }

        default:
            return state;
    }
}

export default common;