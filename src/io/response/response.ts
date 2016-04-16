import { IResponse } from '../interfaces';

export class BaseResponse implements IResponse {
  private name: string;
  private saverEvent: string;
  private requestData;

  constructor(name: string, saverEvent: string) {
    this.name = name;
    this.saverEvent = saverEvent;
  }

  public getName() {
    return this.name;
  }

  // public serialize() {
  //   return '';
  // }

  public getData() {
    return this.requestData;
  }

  public setData<T>(data: Array<T>) {
    this.requestData = data;
  }

  public getSaverEvent() {
    return this.saverEvent;
  }
}
