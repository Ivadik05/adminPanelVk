import { events } from '../../events';
import { marketType } from '../../io/types';
import { connector } from '../../constants';
let objectAssign = require('object-assign');

let initialState = {
  albums: [],
  data: [],
  contentText: ''
};

type market = {
  data: Array<marketType>
  contentText: string;
};

export default function market<Reducer>(state: market = initialState, action) {
  switch (action.type) {
    case events.market.DRAW_MARKETS:
      return objectAssign({}, state, {
        data: action.payload
      });
    case events.saver.MARKET_ALBUMS:
      return objectAssign({}, state, {
        albums: action.payload['albums'],
        data: action.payload['products']
      });
    case events.saver.PAGES:
      return objectAssign({}, state, {
        contentText: (action.payload.id === connector.PAGE_MARKET) ?
            action.payload.text :
            state.contentText
      });
    default:
      return state;
  }
}
