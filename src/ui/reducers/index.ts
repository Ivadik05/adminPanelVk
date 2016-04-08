import { combineReducers } from 'redux';
import event from './event';
import app from './app';
import market from './market';
import { routeReducer } from 'react-router-redux'
const reducers = combineReducers({
  app,
  market,
  event,
  routing: routeReducer
});

export default reducers;
