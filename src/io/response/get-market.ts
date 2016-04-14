import { marketType } from '../types';
import { BaseResponse } from './response';

export function prepareMarket(nameResponse, payload: Array<Object>): BaseResponse {
  let response = new BaseResponse(nameResponse);
  response.setData(payload.map(item => ({
    id: item['id'],
    ownerId: item['owner_id'],
    title: item['title'],
    description: item['description'],
    price: item['price']['text'],
    category: item['category'],
    date: new Date(item['date']),
    photo: item['photos'] ? item['photos'][0]['src_xbig'] : ''
  })));
  return response;
}
