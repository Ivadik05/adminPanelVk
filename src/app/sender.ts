import { Io  } from '../io';
import { IAbstractRequest } from '../io/interfaces';
import { Storage, storageMarks } from '../storage';
import { settings } from '../settings';
import { WebTransmitter } from '../io/transmitter';
import { ITransmitter } from '../io/interfaces';

import { GetAbout } from '../io/request/get-about';
import { GetMarket } from '../io/request/get-market';

export default class Sender {
  private io: Io = null;
  private storage: Storage = null;

  constructor() {
    let requestSettings = {
      host: settings.HOST,
      path: settings.PATH
    };
    let transmitter: ITransmitter = new WebTransmitter(requestSettings);
    this.io = new Io(requestSettings, transmitter);
    this.storage = new Storage();

    // let requests = [new GetMarket('-61279456', '', true), new GetAbout('61279456', '33502073')];
    // this.io.promiseAll(requests, (response: Array<string>) => {
    //   console.error(response);
    // });
  }

  public send(request: IAbstractRequest, callback) {
    // TODO Проверять в стораже данные и заправшивать на сервере
    let requestName = request.getRequest().getName();
    this.io.send(request, callback);
  }
}
