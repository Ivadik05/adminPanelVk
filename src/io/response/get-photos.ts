import { photosType } from '../types';

export function preparePhotos(payload: Array<Object>): Array<photosType> {
  // if (payload['items']) {
  //   payload = payload['items'];
  // }
  payload = payload['items'];
  return payload.map(item => ({
    photo: item['photo_1280'] || ''
  }));
}
