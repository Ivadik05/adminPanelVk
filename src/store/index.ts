import { createStore, applyMiddleware } from 'redux';
import reducers from '../ui/reducers';
let createLogger = require('redux-logger');

const createStoreWithMiddleware = __DEV__ ?
    applyMiddleware(createLogger())(createStore) :
    applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
