


export class WebRequest {
  private url: string;
  private sync: boolean;
  private data: Object = {};
  private method: string = 'GET';
  private headers: Object = {};
  private requests: Array<XMLHttpRequest> = [];

  constructor(url?: string, sync?: string) {
    this.url = url || '/';
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
      result.push(name + '='+ data[name]);
    });
    return result.join('&');
  }

  public setUrl(url: string) {
    this.url = url;
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

  public send(complete?: Function) {

    // let request = util.isIe() ?
    //    new ActiveXObject('Microsoft.XMLHTTP') :
    //    new XMLHttpRequest();

    let request = this.createRequest(this.method, this.url, this.data);
    this.setHeaders(request, this.headers);

    if (!this.sync) {
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          complete(request.responseText);
          this.removeRequest(request);
          request.abort();
        }
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

    if (this.sync) {
      // console.error('done', request.responseText);
    } else {
      this.requests.push(request);
    }
  }

  public abort() {
    while (this.requests.length > 0) {
      this.requests.shift().abort();
    }
  }

  private removeRequest(request: XMLHttpRequest) {
    let i = 0;
    let l = this.requests.length;

    while (i < l) {
      if (this.requests[i] === request) {
        this.requests.splice(i, 1);
      }

      i++;
    }
  }
}
