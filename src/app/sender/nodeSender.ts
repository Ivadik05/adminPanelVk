import { Io  } from '../../io';
import { ITransmitter, IAbstractRequest } from '../../io/interfaces';
import { settings } from '../../settings';
import { NodeTransmitter } from '../../io/transmitter';
import { ISender } from './index';

// import { GetAbout } from '../../io/request';
import { GetMarket } from '../../io/request';

export class NodeSender implements ISender {
  private io: Io = null;
  private requestList: Array<IAbstractRequest> = [
    new GetMarket('-61279456', '', true),
  ];

  constructor() {
    let requestSettings = {
      host: settings.HOST,
      path: settings.PATH
    };
    let transmitter: ITransmitter = new NodeTransmitter(requestSettings);
    this.io = new Io(requestSettings, transmitter);

    // let requests = [new GetMarket('-61279456', '', true), new GetAbout('61279456', '33502073')];
    // this.io.promiseAll(requests, (response: Array<string>) => {
    //   console.error(response);
    // });
  }

  public send() {
    // TODO send
  }

  public fetchAllData(callback) {
    // TODO Promise.all с одним ответом
    // let requestName = request.getRequest().getName();
    this.io.send(new GetMarket('-61279456', '', true), () => {
      callback();
    });
  }
}
