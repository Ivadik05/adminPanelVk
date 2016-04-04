import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { uiPipeMiddleware } from './uiPipeMiddleware';
let createLogger = require('redux-logger');

let __DEV__ = true;
const createStoreWithMiddleware = __DEV__ ?
    applyMiddleware(createLogger(), uiPipeMiddleware)(createStore) :
    applyMiddleware(uiPipeMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
