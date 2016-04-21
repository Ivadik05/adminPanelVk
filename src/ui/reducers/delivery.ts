import { events } from '../../events';
import { connector } from '../../constants';
let objectAssign = require('object-assign');

let initialState = {
  contentText: ''
};

export type deliveryType = {
  contentText: string;
};

export default function delivery<Reducer>(state: deliveryType = initialState, action) {
  switch (action.type) {
    case events.saver.PAGES:
      return objectAssign({}, state, {
        contentText: (action.payload.id === connector.PAGE_DELIVERY) ?
            action.payload.text :
            state.contentText
      });
    default:
      return state;
  }
}
