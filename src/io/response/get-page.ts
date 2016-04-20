import { pagesType } from '../types';
import { BaseResponse } from './response';
import { connector } from '../../constants';

let generateName = (id: string) => {
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

let checkText = (text: string) => {
  if (text.indexOf('&#62;') !== -1 || text.indexOf('&#60;') !== -1) {
    return text.replace(/&#62;/gi, '>').replace(/&#60;/gi, '<');
  }
  return text;
};

export function preparePages(payload: Array<Object>): pagesType {
  return {
    id: String(payload['id']),
    name: generateName(String(payload['id'])),
    title: payload['title'],
    text: checkText(payload['html'])
  };
}
