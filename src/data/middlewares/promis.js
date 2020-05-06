import { BUDGET_GET_REQUEST } from "data/constants";


export default function promiseMiddleware() {
    return function(next){
        return function(action) {
            const { promise, type } = action;

            if(!promise || typeof promise.then !== 'function') {
                return next(action);
            }
            const SUCCESS = `${type}_SUCCESS`
            const FAILURE = `${type}_FAILURE`
            const REQUEST = `${type}_REQUEST`
            next({ type: BUDGET_GET_REQUEST})
        }
    }
}