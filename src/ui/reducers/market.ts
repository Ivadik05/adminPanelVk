import { events } from '../../events';
import { marketType } from '../../io/types';
let objectAssign = require('object-assign');

let initialState = {
  data: []
};

type market = {
  data: Array<marketType>
};

export default function market<Reducer>(state: market = initialState, action) {
  switch (action.type) {
    case events.market.DRAW_MARKETS:
      return objectAssign({}, state, {
        data: action.payload
      });
    default:
      return state;
  }
}
