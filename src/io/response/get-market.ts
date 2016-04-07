import { marketType } from '../types';

export function resolveMarket(payload: Array<any>): Array<marketType> {
  return payload.map((item) => {
    return {
      id: item['id']
    };
  });
}
