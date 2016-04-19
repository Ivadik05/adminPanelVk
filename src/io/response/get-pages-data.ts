import { pagesType } from '../types';
import { BaseResponse } from './response';

let generateName = (id) => {
  switch (id) {
    case 33548281:
      return 'contacts';
    case 33548279:
      return 'market';
    case 33502073:
      return 'about';
    default: break;
  }
};

export function preparePages(payload: Array<Object>): Array<pagesType> {
  payload.splice(0, 1).join();
  return payload.map(item => ({
    id: item['tid'],
    name: generateName(item['tid']),
    title: item['title'],
    text: item['first_comment']
  }));
}
