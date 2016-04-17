import { commentsType } from '../types';
import { BaseResponse } from './response';

export function prepareComments(payload: Array<Object>): Array<commentsType> {
  payload.splice(0, 1).join();
  return payload.map(item => ({
    id: item['id'],
    text: item['text']
  }));
}
