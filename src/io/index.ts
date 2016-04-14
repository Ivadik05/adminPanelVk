import { IRequest, IAbstractRequest, types, IConfig } from './interfaces';
import { utils } from '../utils';
import { ITransmitter } from './interfaces/ITransmitter';
import {queries} from './queries/index';
import { prepareMarket } from './response';
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
        this.config.server,
        request,
        this.handleResponse(
            request.getName(),
            callback,
            () => {}
        )
    );
    console.info(
        `send request to ${this.config.server} method: ${request.getName()}`,
        'request data: ', request.getData());
  }


  /**
   * @param {string} server
   * @param {IRequest} request
   * @param {Function} response
   * @param {Function=} errorResponse
   */
  private requestSend(server: string, request: IRequest, response: Function, errorResponse?: Function) {
    this.transmitter.setHost(server);
    this.transmitter.setData(request.getData());
    this.transmitter.send(response, errorResponse);
    console.info(
        `send request method: ${request.getName()}`,
        'request data: ', request.getData());
  }

  private createPromise(request) {
    return new Promise((resolve, reject) => {
      this.requestSend(
          this.config.server,
          request,
          this.handleResponse(
              request.getName(),
              result => resolve(result),
              result => reject(result)
          )
      );
    });
  }

  public promiseAll(requests: Array<IAbstractRequest>, callback) {
    let promises =  requests.map((request) => {
      return this.createPromise(request);
    });
    Promise.all(promises).then(callback).catch((e) => {
      console.error('e', e);
    });
    console.info(
        `send request promise to ${this.config.server} methods: ${promises}`);
  }

  private handleResponse(nameResponse: string, callback: Function, errorCallback) {
    return (data: string) => {
      let response = utils.decodeJsonData(data);
      // if (response === null) {
      //   errorCallback();
      // }
      // callback(response, 0, data);
      if (response) {
        if (response['response']) {
          let lengthResponseArray: number = response['response'].splice(0, 1).join();
          let resultResponse = this.prepareResponse(nameResponse, response['response']);
          callback(resultResponse, 0, data);
        } else if (response['error']) {
          console.error(`response ${nameResponse} error`);
        }
      } else {
        console.error(`response ${nameResponse} is no data`);
      }
    };
  }

  private prepareResponse(nameResponse: string, response: Array<Object>): Array<Object> {
    let result;
    switch (nameResponse) {
      case queries.GET_MARKET:
        result = prepareMarket(response);
        break;
      default:
        result = response;
        break;
    }
    return result;
  }

  /**
   * @inheritDoc
   */
  public send(req: IAbstractRequest, callback?: Function) {
    let request = req.getRequest();
    if (request) {
      this.sendAlone(request, callback);
    } else {
      console.info(`request wasn't sent`, JSON.stringify(req));
    }
  }
}
