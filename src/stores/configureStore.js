import { applyMiddleware, compose, createStore } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import timerMiddleware from 'redux-timer-middleware'
import arrLogic from '../logic'

//import monitorReducersEnhancer from './enhancers/monitorReducers'
//import loggerMiddleware from './middleware/logger'
import rootReducer from '../reducers'

export default function configureStore(preloadedState) {
  /*
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  */

  //const enhancers = [middlewareEnhancer, monitorReducersEnhancer]

  const deps = {}
  const logicMiddleware = createLogicMiddleware(arrLogic, deps)
  const middlewares = [logicMiddleware, timerMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}
