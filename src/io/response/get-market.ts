import { marketType } from '../types';

export function prepareMarket(payload: Array<any>): Array<marketType> {
  return payload.map((item) => {
    return {
      id: item['id'],
      ownerId: item['owner_id'],
      title: item['title'],
      description: item['description'],
      price: item['price']['text'],
      category: item['category'],
      date: new Date(item['date']),
      photo: item['photos'][0]['src_xbig']
    };
  });
}
