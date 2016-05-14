import { ITransport, ITransportOptions } from '../interfaces';
import * as queryString from 'query-string';
import { IConfig } from '../interfaces';


export class WebTransport implements ITransport {
  private host: string;
  private path: string;
  private port: string;

  constructor(config: IConfig) {
    this.host = config.host;
    this.path = config.path;
    this.port = config.port;
  }

  private createRequest(method: string, url: string, async: boolean) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    return xhr;
  }

  private getHost() {
    return this.host;
  }

  private getPath() {
    return this.path;
  }

  private getPort() {
    return this.port;
  }

  private createUrl() {
    return 'http://' + this.getHost() + (this.getPort() ? `:${this.getPort()}` : '') + this.getPath();
  }

  private createFullUrl(queryParams) {
    return 'http://' + this.getHost() + (this.getPort() ? `:${this.getPort()}` : '') + this.getPath() + '?' + queryParams;
  }

  public getType() {
    return 'WebTransmitter';
  }

  public send(options: ITransportOptions, complete: Function, errorResponse?: Function) {
    // let request = util.isIe() ?
    //    new ActiveXObject('Microsoft.XMLHTTP') :
    //    new XMLHttpRequest();
    let sendOptions = {
      method: options.method || 'GET',
      async: (options.async === false) ? false : true,
      query: options.query || {}
    };
    let queryParams = queryString.stringify(sendOptions.query);
    let request =
        this.createRequest(
            sendOptions.method,
            (sendOptions.method !== 'GET') ? this.createUrl() : this.createFullUrl(queryParams),
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
    request.send(queryParams);
  }
}
