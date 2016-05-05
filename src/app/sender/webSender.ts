import { Io  } from '../../io';
import { WebStorage, storageKeys } from '../../storage';
import { IAbstractRequest } from '../../io/interfaces';
import { settings } from '../../settings';
import { WebTransmitter } from '../../io/transmitter';
import { ITransmitter } from '../../io/interfaces';
import { IStorage } from '../../io/interfaces';
import { ISender } from './index';

// import { GetAbout } from '../../io/request';
import { GetMarket } from '../../io/request';

export class WebSender implements ISender {
  private io: Io = null;
  private storage: IStorage = null;

  constructor() {
    let requestSettings = {
      host: settings.HOST,
      path: settings.PATH,
      port: settings.PORT
    };
    let transmitter: ITransmitter = new WebTransmitter(requestSettings);
    this.io = new Io(requestSettings, transmitter);

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
