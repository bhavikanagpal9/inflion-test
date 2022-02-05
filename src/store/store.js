import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducer'

const rootReducer = combineReducers({
  appReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;