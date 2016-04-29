import { IStorage } from '../io/interfaces';
export { storageKeys } from './storage-keys';

export class WebStorage implements IStorage {
  private storageKey: string;
  private storage: Storage;
  private permanentDays: number;

  constructor(storageKey, permanent: boolean = true, permanentDays: number = 2) {
    this.storageKey = storageKey;
    this.storage = permanent ? localStorage : sessionStorage;
    this.permanentDays = permanentDays;
  }

  public getPayloadData(data) {
    data = JSON.parse(data);
    let nowDate = new Date();
    function getDateAgo(date, days) {
      let dateCopy = new Date(date);
      dateCopy.setDate(date.getDate() - days);
      return dateCopy;
    }
    if (getDateAgo(nowDate, this.permanentDays) > new Date(data['time'])) {
      this.removeData(name);
    } else {
      return data.payload;
    }
    return null;
  }

  public saveData(name: string, payload: any) {
    let data = {
      time: new Date,
      payload: payload
    };
    this.storage.setItem(`${this.storageKey}:${name}`, JSON.stringify(data));
  }

  public restoreData(name: string) {
    let data = this.storage.getItem(`${this.storageKey}:${name}`);
    if (data) {
      return this.getPayloadData(data);
    }
    return null;
  }

  public removeData(name: string) {
    this.storage.removeItem(`${this.storageKey}:${name}`);
  };

  public listenStorage(name: string, callback: Function) {
    window.addEventListener('storage', (event) => {
      if (event.key === `${this.storageKey}-${name}`) {
        callback(event);
      }
    }, false);
  };
}
