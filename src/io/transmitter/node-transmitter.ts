import { ITransmitter } from '../interfaces';
import * as queryString from 'query-string';
import { ITransmitterOptions } from '../interfaces';
import { IConfig } from '../interfaces';
import * as http from 'http';
import * as fs from 'fs';

export class NodeTransmitter implements ITransmitter {
  private host: string;
  private path: string;

  constructor(config: IConfig) {
    this.host = config.host;
    this.path = config.path;
  }

  private getHost() {
    return (this.host ? this.host : '/');
  }

  private getPath() {
    return this.path;
  }

  public getType() {
    return 'NodeTransmitter';
  }

  private createPathWithQuery(query: Object) {
    let queryParams = queryString.stringify(query);
    return this.getPath() + '?' + queryParams;
  }

  public send(options: ITransmitterOptions, complete: Function, errorResponse?: Function) {
    let sendOptions = {
      host: this.getHost(),
      hostname: this.getHost(),
      path: this.createPathWithQuery(options.query),
      method: options.method || 'GET',
      async: options.async,
      query: options.query || {}
    };
    let request = http.get(sendOptions, (res) => {
      let bodyChunks = [];
      res.on('data', function(chunk) {
        bodyChunks.push(chunk);
      }).on('end', function() {
        let body = Buffer.concat(bodyChunks);
        complete(body);
      });
    });

    request.on('error', function(e) {
      errorResponse(e);
      console.log('ERROR: ' + e.message);
    });

    request.end();
  }
}
