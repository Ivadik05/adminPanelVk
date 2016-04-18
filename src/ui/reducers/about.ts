import { events } from '../../events';
import { pagesType } from '../../io/types';
import { connector } from '../../constants';
let objectAssign = require('object-assign');

let initialState = {
  contentText: ''
};

export type aboutType = {
  contentText: string;
};

export default function about<Reducer>(state: aboutType = initialState, action) {
  switch (action.type) {
    case events.saver.PAGES:
      console.error(action.payload);
      console.error(connector.PAGE_ABOUT);
      return objectAssign({}, state, {
        contentText: (action.payload.id === connector.PAGE_ABOUT) ?
            action.payload.text :
            state.contentText
      });
    default:
      return state;
  }
}
