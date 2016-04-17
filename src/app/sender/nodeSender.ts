import { Io  } from '../../io';
import { ITransmitter, IAbstractRequest } from '../../io/interfaces';
import { settings } from '../../settings';
import { NodeTransmitter } from '../../io/transmitter';
import { ISender } from './index';
import { Store } from 'redux';

import { GetMarket, GetAbout } from '../../io/request';
import { BaseResponse } from '../../io/response/response';

export class NodeSender implements ISender {
  private io: Io = null;
  private store: Store;
  private requestList: Array<IAbstractRequest> = [
    new GetMarket('-61279456', '', true),
    new GetAbout('61279456', '33502073')
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

  public send() {
    // TODO send
  }

  public fetchAllData(callback) {
    // TODO Promise.all с одним ответом
    // let requestName = request.getRequest().getName();
    this.io.promiseAll(this.requestList, (responses: Array<BaseResponse>) => {
      responses.map((response) => {
        this.store.dispatch({
          type: response.getSaverEvent(),
          payload: response.getData()
        })
      });
      callback();
    });
  }
}
