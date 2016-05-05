import {request} from './request';
import {queries} from '../queries';
import { events } from '../../events';
import {error} from "util";
import { IRequest } from '../interfaces/IRequest';

type executeData = {
  code: string;
}

export class Execute extends request.VK {
  private code: string;

  /**
   * @param code специальный код на vk-script
   */
  constructor(code: string) {
    super(queries.EXECUTE, events.saver.EXECUTE);
    this.code = code;
  }
  // return [API.users.isAppUser(), API.friends.get(), API.status.get()];
  // return {"user": API.users.isAppUser(), "friends": API.friends.get(), "status": API.status.get()};
  static createPromiseCode(requests: Array<IRequest>): string {
    let requestsStr = requests.map(req => {
      let method: string = `API.${req.getName()}`;
      let attr: Object = req.getData();
      let attrStr: string = Object.keys(attr)
          .reduce((acc: Array<string>, dataName): Array<string> => {
            if (dataName !== 'method' && dataName !== 'v') {
              acc.push(`"${dataName}":${attr[dataName]}`);
            }
            return acc;
          }, [])
          .join(',');
      return `{"name":"${req.getName()}","saver":"${req.getSaverEvent()}","data":${method}({${attrStr}})}`;
    });
    return `${requestsStr.join(',')}`;
  }

  /**
   * @returns {string}
   */
  public getCode(): string {
    return this.code;
  }


  /**
   * @inheritDoc
   */
  public getData(): executeData {
    let data = {
      'method': this.getName(),
      'code': this.getCode(),
      'v': '5.50'
    };
    return data;
  }
}
