import { createStore, applyMiddleware } from 'redux';
import reducers from '../ui/reducers';
let createLogger = require('redux-logger');
import { browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = __DEV__ ?
    applyMiddleware(createLogger(), reduxRouterMiddleware)(createStore) :
    applyMiddleware(reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
