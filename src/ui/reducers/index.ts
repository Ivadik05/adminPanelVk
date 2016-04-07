import { combineReducers } from 'redux';
import event from './event';
import app from './app';
import market from './market';

const reducers = combineReducers({
  app,
  market,
  event
});

export default reducers;
