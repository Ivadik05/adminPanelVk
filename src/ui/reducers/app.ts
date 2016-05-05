import { events } from '../../events';
let objectAssign = require('object-assign');
import { uiState } from '../../constants';

let initialState = {
  started: false,
  uiState: null,
  bgPhoto: ''
};

export default function app<Reducer>(state = initialState, action) {
  switch (action.type) {
    case events.system.APPLICATION_STARTED:
      return objectAssign({}, state, {
        started: true,
        uiState: uiState.MAIN
      });
    case events.saver.PHOTOS:
      return objectAssign({}, state, {
        bgPhoto: action.payload[3]
      });
    // case events.router.LOCATION_CHANGE:
    //   return objectAssign({}, state, {
    //     uiState: uiState.MAIN
    //   });
    default:
      return state;
  }
}
