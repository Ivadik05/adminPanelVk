import { events } from '../../events';
import { pagesType } from '../../io/types';
let objectAssign = require('object-assign');

let initialState = {
  contentText: ''
};

export type contactsType = {
  contentText: string;
};

export default function contacts<Reducer>(state: contactsType = initialState, action) {
  switch (action.type) {
    case events.saver.PAGES:
      return objectAssign({}, state, {
        // contentText: action.payload.filter(page => page['name'] === 'contacts')[0].text
      });
    default:
      return state;
  }
}
