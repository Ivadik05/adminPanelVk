import { Io  } from '../io';
import { IAbstractRequest } from '../io/interfaces';
import { Storage, storageMarks } from '../storage';
import { settings } from '../settings';

export default class Sender {
  private io: Io = null;
  private storage: Storage = null;

  constructor() {
    this.io = new Io({server: settings.SERVER});
    this.storage = new Storage();
  }

  public send(request: IAbstractRequest, callback) {
    // TODO Проверять в стораже данные и заправшивать на сервере
    let requestName = request.getRequest().getName();
    this.io.send(request, callback);
  }
}
