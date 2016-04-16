import { combineReducers } from 'redux';
import event from './event';
import app from './app';
import market from './market';
import about from './about';
import { routerReducer } from 'react-router-redux'
const reducers = combineReducers({
  app,
  market,
  about,
  event,
  routing: routerReducer
});

export default reducers;
