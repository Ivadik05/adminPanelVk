import { Io  } from '../../io';
import { ITransmitter, IRequest, IAbstractRequest } from '../../io/interfaces';
import { settings } from '../../settings';
import { NodeTransmitter } from '../../io/transmitter';
import { ISender } from './index';
import { Store } from 'redux';

import { GetMarket, GetPage } from '../../io/request';
import { BaseResponse } from '../../io/response/response';
import { connector } from '../../constants';
import { routeConstants } from '../../routes/index';

export class NodeSender implements ISender {
  private io: Io = null;
  private store: Store;
  private requestList: Array<IRequest> = [
    new GetMarket(connector.GROUP_ID, '', true),
    new GetPage(connector.GROUP_ID, connector.PAGE_ABOUT),
    new GetPage(connector.GROUP_ID, connector.PAGE_CONTACTS),
    new GetPage(connector.GROUP_ID, connector.PAGE_DELIVERY),
    new GetPage(connector.GROUP_ID, connector.PAGE_MARKET)
  ];

  constructor(store: any) {
    let requestSettings = {
      host: settings.HOST,
      path: settings.PATH
    };
    this.store = store;
    let transmitter: ITransmitter = new NodeTransmitter(requestSettings);
    this.io = new Io(requestSettings, transmitter);
  }

  private updateStore(callback) {
    return (response: BaseResponse) => {
      this.store.dispatch({
        type: response.getSaverEvent(),
        payload: response.getData()
      });
      callback();
    };
  }

  public requestResolver(location, callback) {
    switch (location) {
      case routeConstants.INDEX:
          this.send(new GetMarket(connector.GROUP_ID, '', true), this.updateStore(callback));
        break;
      case routeConstants.ABOUT:
        this.send(new GetPage(connector.GROUP_ID, connector.PAGE_ABOUT), this.updateStore(callback));
        break;
      case routeConstants.MARKET:
        this.send(new GetPage(connector.GROUP_ID, connector.PAGE_MARKET), this.updateStore(callback));
        break;
      case routeConstants.CONTACTS:
        this.send(new GetPage(connector.GROUP_ID, connector.PAGE_CONTACTS), this.updateStore(callback));
        break;
      default: break;
    }
  }

  public send(request: IAbstractRequest, callback) {
    // let requestName = request.getRequest().getName();
    this.io.send(request, callback);
  }

  public fetchAllData(callback) {
    // TODO Promise.all с одним ответом
    // let requestName = request.getRequest().getName();
    this.io.promiseAll(this.requestList, (responses: Array<BaseResponse>) => {
      responses.map((response) => {
        this.store.dispatch({
          type: response.getSaverEvent(),
          payload: response.getData()
        });
      });
      callback();
    });
  }
}
