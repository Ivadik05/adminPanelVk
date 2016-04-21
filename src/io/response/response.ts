import { IResponse } from '../interfaces';

export class BaseResponse<TResponse> implements IResponse<TResponse> {
  private name: string;
  private saverEvent: string;
  private requestData: TResponse;

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

  public getData(): TResponse {
    return this.requestData;
  }

  public setData(data: TResponse) {
    this.requestData = data;
  }

  public getSaverEvent() {
    return this.saverEvent;
  }
}
