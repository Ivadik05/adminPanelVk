import { Io, GetMarket } from '../io';
import { Storage, storageMarks } from '../storage';

export default class Sender {
  private io: Io = null;
  private storage: Storage = null;

  constructor() {
    console.error(window['SETTINGS']['SERVER']);
    this.io = new Io({server: window['SETTINGS']['SERVER']});
    this.storage = new Storage();
    this.io.send(new GetMarket('61279456'), (response) => {
      console.error('юху', response);
    });
  }
}
