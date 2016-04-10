import { createStore, applyMiddleware } from 'redux';
import reducers from '../ui/reducers';
let createLogger = require('redux-logger');

let __DEV__ = true;
export default function storeDev() {
    const createStoreWithMiddleware = __DEV__ ?
        applyMiddleware(createLogger())(createStore) :
        applyMiddleware()(createStore);
    const store = createStoreWithMiddleware(reducers);

    return store;
}
