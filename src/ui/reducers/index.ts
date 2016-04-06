import { combineReducers } from 'redux';
import event from './event';
import app from './app';

const reducers = combineReducers({
  event,
  app
});

export default reducers;
