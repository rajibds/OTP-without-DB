import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducers';

// eslint-disable-next-line import/no-mutable-exports
let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
} else {
  store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;
