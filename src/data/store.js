import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from '../data/middlewares/promis';
import notificationModdleware from './middlewares/notification';

export default function configureStore(preloadedState) {

  const middlewares = [
    // thunkMiddleware,
    promiseMiddleware,
    notificationModdleware,
  ]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)


  if(process.env.NODE_ENV !== 'production' && module.hot) { //zaakceptuj wszystkie reducery i dopoku nasza aplikacja bedzie sie ladowac pobierz all reducer wraz ze stanem i wrzuc do stora.
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}