import { events } from '../../events';
import { commentsType } from '../../io/types';
let objectAssign = require('object-assign');

let initialState = {
  data: []
};

export type aboutType = {
  data: Array<commentsType>
};

export default function about<Reducer>(state: aboutType = initialState, action) {
  switch (action.type) {
    case events.saver.ABOUT:
    case events.market.DRAW_MARKETS:
      return objectAssign({}, state, {
        data: action.payload
      });
    default:
      return state;
  }
}
