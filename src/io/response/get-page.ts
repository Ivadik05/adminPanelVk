import { pagesType } from '../types';
import { BaseResponse } from './response';
import { connector } from '../../constants';

let generateName = (id: string) => {
  console.error(id);
  switch (id) {
    case connector.PAGE_CONTACTS:
      return 'contacts';
    case connector.PAGE_MARKET:
      return 'market';
    case connector.PAGE_ABOUT:
      return 'about';
    case connector.PAGE_DELIVERY:
      return 'delivery';
    default: break;
  }
};

export function preparePages(payload: Array<Object>): pagesType {
  return {
    id: String(payload['id']),
    name: generateName(String(payload['id'])),
    title: payload['title'],
    text: payload['html']
  };
}
