

export interface IStorage {
  saveData(name: string, payload: any): void;
  restoreData(name: string): any;
  removeData(name: string): void;
  listenStorage(name: string, callback: Function): void;
}
