import { combineReducers } from 'redux';
import event from './event';
import app from './app';

const reducers = combineReducers({
  app,
  event
});

export default reducers;
