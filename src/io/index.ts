import { IRequest, IAbstractRequest, types, IConfig } from './interfaces';
import { utils } from '../utils';
import { ITransport } from './interfaces';
import { queries } from './queries/index';
import { prepareMarket, preparePages, prepareAlbums, preparePhotos } from './response';
import { BaseResponse } from './response';
import {marketType, pagesType, marketAlbumsType, photosType} from './types';
export * from './request';

export class Io {
  private transport: ITransport = null;

  constructor(transport: ITransport) {
    this.transport = transport;
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
        `IO: ${this.transport.getType()}: send request method: ${request.getName()}`);
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
    this.transport.send(options, response, errorResponse);
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
    console.info(`IO: ${this.transport.getType()}:
     send request methods: ${requests.map(request => request.getName())}`);
  }

  private handleResponse(nameResponse: string, saverEvent: string, callback: Function, errorCallback) {
    return (data: string) => {
      let response = utils.decodeJsonData(data);
      if (response) {
        if (response['response']) {
          let resultResponse = this.prepareResponse(nameResponse, saverEvent, response['response']);
          callback(resultResponse, data);
        } else if (response['error']) {
          console.error(`response ${nameResponse} error: ${data}`);
        }
      } else {
        console.error(`response ${nameResponse} is no data: '${data}'`);
      }
    };
  }

  private prepareResponse(nameResponse: string, saverEvent: string, response: Array<Object>) {
    let result: any;
    switch (nameResponse) {
      case queries.GET_MARKET:
        result = new BaseResponse<Array<marketType>>(nameResponse, saverEvent);
        result.setData(prepareMarket(response));
        break;
      case queries.GET_ALBUMS_MARKET:
        result = new BaseResponse<marketAlbumsType>(nameResponse, saverEvent);

        result.setData(prepareAlbums(response));
        break;
      case queries.GET_PAGE:
        // response = response['topics'];
        result = new BaseResponse<pagesType>(nameResponse, saverEvent);
        result.setData(preparePages(response));
        break;
      case queries.GET_PHOTOS:
        result = new BaseResponse<photosType>(nameResponse, saverEvent);
        result.setData(preparePhotos(response));
        break;
      case queries.EXECUTE:
        result = new BaseResponse<Array<BaseResponse<any>>>(nameResponse, saverEvent);
        let prepareResponses = response
            .map(res => this.prepareResponse(res['name'], res['saver'], res['data']));
        result.setData(prepareResponses);
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
