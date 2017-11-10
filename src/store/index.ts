import { createStore, applyMiddleware } from 'redux';
import reducers from '../ui/reducers';
let createLogger = require('redux-logger');

let createStoreWithMiddleware =
    (process.env.NODE_ENV === 'development') ? applyMiddleware(createLogger()) : applyMiddleware();
let initialState = window['__INITIAL_STATE__'] ? window['__INITIAL_STATE__'] : createStore(reducers, {});

let store = createStore(
    reducers,
    initialState,
    createStoreWithMiddleware
);

export default store;
