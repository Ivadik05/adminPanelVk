import { ITransmitter } from '../interfaces';
import * as http from 'http';

export class NodeRequest implements ITransmitter {
  private host: string;
  private path: string;
  private sync: boolean;
  private data: Object = {};
  private method: string = 'GET';
  private headers: Object = {};

  constructor(url?: string, path?: string, sync?: string) {
    this.host = url || '/';
    this.path = path || '';
    this.sync = !!sync;
  }

  private createRequest(options, url, data, callback) {
    let requestURL = url;
    let dataString = this.joinUrlData(data);
    if (dataString.length !== 0) {
      requestURL += (requestURL.indexOf('?') === -1 ? '?' : '&') + dataString;
    }

    let req = http.get(requestURL, (res) => {
      let bodyChunks = [];
      res.on('data', function(chunk) {
        bodyChunks.push(chunk);
      }).on('end', function() {
        let body = Buffer.concat(bodyChunks);
        console.log('BODY: ' + body);
        callback(body);
      });
    });
    return req;
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

  public setHost(url: string) {
    this.host = url;
  }

  public setPath(path: string) {
    this.path = path;
  }

  public setData(data: Object) {
    this.data = data;
  }

  public setMethod(method: string) {
    this.method = method;
  }

  public addHeader(name: string, value: string) {
    this.headers[name] = value;
  }

  public removeHeader(name: string) {
    delete this.headers[name];
  }

  private getUrl() {
    return this.host + this.path;
  }

  private getData() {
    return this.data;
  }

  public send(complete?: Function) {
    let request = this.createRequest({}, this.getUrl(), this.getData(), (result) => {
      complete(result);
    });
    request.on('error', function(e) {
      console.log('ERROR: ' + e.message);
    });

    request.end();
  }
}
