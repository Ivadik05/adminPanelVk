import { ITransmitter } from '../interfaces';


export class WebRequest implements ITransmitter {
  private host: string;
  private path: string;
  private sync: boolean;
  private data: Object = {};
  private method: string = 'GET';
  private headers: Object = {};

  constructor(host?: string, path?: string, sync?: string) {
    this.host = host || '/';
    this.path = path || '';
    this.sync = !!sync;
  }

  private createRequest(method, url, data) {
    let xhr = new XMLHttpRequest();
    let requestURL = url;
    let dataString = this.joinUrlData(data);
    if (method === 'GET' && dataString.length !== 0) {
      requestURL += (requestURL.indexOf('?') === -1 ? '?' : '&') + dataString;
    }
    xhr.open(this.method, requestURL, !this.sync);
    return xhr;
  }

  private setHeaders(xhr: XMLHttpRequest, headers: Object) {
    for (let name in headers) {
      if (name) {
        xhr.setRequestHeader(name, headers[name]);
      }
    }
  }

  private joinUrlData(data: Object): string {
    let result = [];
    Object.keys(data).map((name) => {
      result.push(name + '=' + data[name]);
    });
    return result.join('&');
  }

  private getUrl() {
    return 'http://' + this.host + this.path;
  }

  public setHost(host: string) {
    this.host = host;
  }

  public setPath(path: string) {
    this.path = path;
  }

  public setData(data) {
    this.data = data;
  }

  public setMethod(method) {
    this.method = method;
  }

  public addHeader(name: string, value: string) {
    this.headers[name] = value;
  }

  public removeHeader(name: string) {
    delete this.headers[name];
  }

  public send(complete?: Function, errorResponse?: Function) {

    // let request = util.isIe() ?
    //    new ActiveXObject('Microsoft.XMLHTTP') :
    //    new XMLHttpRequest();

    let request = this.createRequest(this.method, this.getUrl(), this.data);
    this.setHeaders(request, this.headers);

    if (!this.sync) {
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          complete(request.responseText);
          request.abort();
        }
      };
      request.onerror = (e) => {
        errorResponse(e);
      };
    }

    let sendData = null;
    if (this.method !== 'GET') {
      request.setRequestHeader(
          'Content-Type', 'application/x-www-form-urlencoded'
      );
      sendData = this.joinUrlData(this.data);
    }

    request.send(sendData);
  }
}
