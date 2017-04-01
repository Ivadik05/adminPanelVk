import { events } from '../../events';

import { uiState } from '../../constants';
import { utils } from '../../utils';

let initialState = {
  started: false,
  uiState: null,
  bgPhoto: ''
};

export default function app<Reducer>(state = initialState, action) {
  switch (action.type) {
    case events.system.APPLICATION_STARTED:
      return Object.assign({}, state, {
        started: true,
        uiState: uiState.MAIN
      });
    case events.saver.PHOTOS:
      return Object.assign({}, state, {
        bgPhoto: action.payload[utils.getRandomInt(0, action.payload.length - 1)].photo
      });
    // case events.router.LOCATION_CHANGE:
    //   return Object.assign({}, state, {
    //     uiState: uiState.MAIN
    //   });
    default:
      return state;
  }
}
