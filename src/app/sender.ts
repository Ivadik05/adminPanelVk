import { Io  } from '../io';
import { IAbstractRequest } from '../io/interfaces';
import { Storage, storageMarks } from '../storage';

export default class Sender {
  private io: Io = null;
  private storage: Storage = null;

  constructor() {
    this.io = new Io({server: window['SETTINGS']['SERVER']});
    this.storage = new Storage();
  }

  public send(request: IAbstractRequest, callback) {
    // TODO Проверять в стораже данные и заправшивать на сервере
    let requestName = request.getRequest().getName();
    this.io.send(request, callback);
  }
}
