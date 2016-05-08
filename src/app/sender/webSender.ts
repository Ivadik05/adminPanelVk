import { Io  } from '../../io';
import { IAbstractRequest, ITransport } from '../../io/interfaces';
import { settings } from '../../settings';
import { WebTransport } from '../../io/transport';
import { ISender } from './index';

// import { GetAbout } from '../../io/request';
import { GetMarket } from '../../io/request';

export class WebSender implements ISender {
  private io: Io = null;

  constructor() {
    let connectorSettings = settings.connector;
    let requestSettings = {
      host: connectorSettings.HOST,
      path: connectorSettings.PATH,
      port: connectorSettings.PORT
    };
    let transport: ITransport = new WebTransport(requestSettings);
    this.io = new Io(transport);

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

  public fetchAllData() {
    
  }
}
