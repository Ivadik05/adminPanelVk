import { IRequest, IAbstractRequest, types, IConfig } from './interfaces';
import { utils } from '../utils';
import { ITransmitter } from './interfaces';
import {queries} from './queries/index';
import { prepareMarket, prepareComments } from './response';
import { BaseResponse } from './response';
import {marketType, commentsType} from './types';
export * from './request';

export class Io {
  private transmitter: ITransmitter = null;
  private config: IConfig = null;

  constructor(config: IConfig, transmitter: ITransmitter) {
    this.config = config;
    this.transmitter = transmitter;
  }

  /**
   * @param {IRequest} request
   */
  private sendAlone(request: IRequest, callback) {
    this.requestSend(
        request,
        this.handleResponse(
            request.getName(),
            request.getSaverEvent(),
            callback,
            () => {}
        )
    );
    console.info(
        `IO: ${this.transmitter.getType()}: send request method: ${request.getName()}`,
        'request data: ', request.getData());
  }


  /**
   * @param {IRequest} request
   * @param {Function} response
   * @param {Function=} errorResponse
   */
  private requestSend(request: IRequest, response: Function, errorResponse?: Function) {
    let options = {
      method: 'GET',
      async: true,
      query: request.getData()
    };
    this.transmitter.send(options, response, errorResponse);
  }

  private createPromise(request) {
    return new Promise((resolve, reject) => {
      this.requestSend(
          request,
          this.handleResponse(
              request.getName(),
              request.getSaverEvent(),
              result => resolve(result),
              result => reject(result)
          )
      );
    });
  }

  public promiseAll(requests: Array<IRequest>, callback) {
    let promises =  requests.map((request) => {
      return this.createPromise(request);
    });
    Promise.all(promises).then(callback).catch((e) => {
      console.error('e', e);
    });
    console.info(`IO: ${this.transmitter.getType()}:
     send request methods: ${requests.map(request => request.getName())}`);
  }

  private handleResponse(nameResponse: string, saverEvent: string, callback: Function, errorCallback) {
    return (data: string) => {
      let response = utils.decodeJsonData(data);
      // if (response === null) {
      //   errorCallback();
      // }
      // callback(response, 0, data);
      if (response) {
        if (response['response']) {
          let resultResponse = this.prepareResponse(nameResponse, saverEvent, response['response']);
          callback(resultResponse, data);
        } else if (response['error']) {
          console.error(`response ${nameResponse} error`);
        }
      } else {
        console.error(`response ${nameResponse} is no data`);
      }
    };
  }

  private prepareResponse(nameResponse: string, saverEvent: string, response: Array<Object>): BaseResponse {
    let result = new BaseResponse(nameResponse, saverEvent);
    switch (nameResponse) {
      case queries.GET_MARKET:
        result.setData<marketType>(prepareMarket(response));
        break;
      case queries.GET_COMMENTS:
        response = response['comments'];
        result.setData<commentsType>(prepareComments(response));
        break;
      default: break;
    }
    return result;
  }

  /**
   * @inheritDoc
   */
  public send(req: IAbstractRequest, callback: Function) {
    let request = req.getRequest();
    if (request) {
      this.sendAlone(request, callback);
    } else {
      console.info(`request wasn't sent`, JSON.stringify(req));
    }
  }
}
