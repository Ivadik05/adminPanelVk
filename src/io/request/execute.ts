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
    return `return[${requestsStr.join(',')}];`;
  }
  // static createPromiseCode(requests: Array<IRequest>): string {
  //   var posts = API.wall.get({"count": 1});
  //   if (posts.count<0) {
  //     return {"post": null, "copy_owner": null};
  //   } else {
  //     var post = posts.items[0];
  //     var copy_owner=null;
  //     if (post.copy_history[0]){
  //       if (post.copy_history[0].owner_id > 0) {
  //         copy_owner = API.users.get({"user_id": post.copy_history[0].owner_id})[0];
  //       } else
  //       if (post.copy_history[0].owner_id  < 0) {
  //         copy_owner = API.groups.getById({"group_ids": -post.copy_history[0].owner_id})[0];
  //       }
  //       return {"post": post, "copy_owner": copy_owner};
  //     } else {
  //       return {"post": post, "copy_owner": null};
  //     }
  //   }
  // }

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
