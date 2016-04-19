import { Io  } from '../../io';
import { ITransmitter, IRequest } from '../../io/interfaces';
import { settings } from '../../settings';
import { NodeTransmitter } from '../../io/transmitter';
import { ISender } from './index';
import { Store } from 'redux';

import { GetMarket, GetPagesData } from '../../io/request';
import { BaseResponse } from '../../io/response/response';
import { connector } from '../../constants';

export class NodeSender implements ISender {
  private io: Io = null;
  private store: Store;
  private requestList: Array<IRequest> = [
    new GetMarket(connector.GROUP_ID, '', true),
    new GetPagesData(connector.GROUP_ID)
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
        });
      });
      callback();
    });
  }
}
