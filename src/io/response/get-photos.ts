import { photosType } from '../types';

export function preparePhotos(payload: Array<Object>): Array<photosType> {
  // payload.splice(0, 1).join();
  return payload.map(item => ({
    photo: item['photo_1280'] || ''
  }));
}
