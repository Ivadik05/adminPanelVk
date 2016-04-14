import { IResponse } from '../interfaces';

export class BaseResponse implements IResponse {
  private name: string;
  private requestData: Object;

  constructor(name: string) {
    this.name = name;
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
  
  public setData(data) {
    this.requestData = data;
  }
}
