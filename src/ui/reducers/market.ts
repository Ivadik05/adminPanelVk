import { events } from '../../events';
import { marketType } from '../../io/types';
import { connector } from '../../constants';
let objectAssign = require('object-assign');

let initialState = {
  data: [
    {
      id: 'ddddd',
      ownerId: '1231231',
      title: 'Шарф',
      description: 'УРАААА!!!',
      price: '100р',
      category: {
        id: 2222,
        name: 'Кака',
        section: {}
      },
      date: new Date(),
      photo: ''
    }
  ],
  contentText: ''
};

type market = {
  data: Array<marketType>
  contentText: string;
};

export default function market<Reducer>(state: market = initialState, action) {
  switch (action.type) {
    case events.saver.MARKET:
    case events.market.DRAW_MARKETS:
      return objectAssign({}, state, {
        data: action.payload
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
