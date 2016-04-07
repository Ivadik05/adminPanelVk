import { Io } from '../io';
import { Storage, storageMarks } from '../storage';

export default class Sender {
  private io: Io = null;
  private storage: Storage = null;

  constructor() {
    this.io = new Io();
    this.storage = new Storage()
  }
}
