// import { Reducer } from 'redux';
import { events } from '../../events';
let objectAssign = require('object-assign');

let initialState = {
  started: false
};

export default function app<Reducer>(state = initialState, action) {
  switch (action.type) {
    case events.system.APPLICATION_STARTED:
      return objectAssign({}, state, {
        started: true
      });
    default:
      return state;
  }
}
