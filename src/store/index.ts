import { createStore, applyMiddleware } from 'redux';
import reducers from '../ui/reducers';
let createLogger = require('redux-logger');
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

let __DEV__ = true;
const createStoreWithMiddleware = __DEV__ ?
    applyMiddleware(createLogger())(createStore) :
    applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
