import { ITransmitter } from '../interfaces';
import * as queryString from 'query-string';
import { ITransmitterOptions } from '../interfaces';
import { IConfig } from '../interfaces';


export class WebTransmitter implements ITransmitter {
  private host: string;
  private path: string;

  constructor(config: IConfig) {
    this.host = config.host;
    this.path = config.path;
  }

  private createRequest(method: string, url: string, async: boolean) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    return xhr;
  }

  private getHost() {
    return (this.host ? this.host : '/');
  }

  private getPath() {
    return this.path;
  }

  private createUrl(query: Object) {
    let queryParams = queryString.stringify(query);
    return 'http://' + this.getHost() + this.getPath() + '?' + queryParams;
  }

  public getType() {
    return 'WebTransmitter';
  }

  public send(options: ITransmitterOptions, complete: Function, errorResponse?: Function) {
    // let request = util.isIe() ?
    //    new ActiveXObject('Microsoft.XMLHTTP') :
    //    new XMLHttpRequest();
    let sendOptions = {
      method: options.method || 'GET',
      async: (options.async === false) ? false : true,
      query: options.query || {}
    };
    let request =
        this.createRequest(
            sendOptions.method,
            this.createUrl(sendOptions.query),
            sendOptions.async
        );
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status !== 200) {
        complete(request.responseText);
        request.abort();
      } else {
        complete(request.responseText);
      }
    };
    request.onerror = (e) => {
      errorResponse(e);
    };
    if (sendOptions.method !== 'GET') {
      request.setRequestHeader(
          'Content-Type', 'application/x-www-form-urlencoded'
      );
    }
    request.send();
  }
}
