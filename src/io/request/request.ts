import {IRequest, IAbstractRequest, types} from '../interfaces';

export module request {
  'use strict';
  export class BaseRequest {
    private name: string;
    private requestData: Object;

    constructor(name: string) {
      this.name = name;
    }

    public getName() {
      return this.name;
    }

    public serialize() {
      return '';
    }
    public getData() {
      return this.requestData;
    }

    public setData(data) {
      this.requestData = data;
    }
  }

  export class VK extends BaseRequest implements IRequest, IAbstractRequest {
    constructor(name: string) {
      super(name);
    }

    public getRequest() {
      return this;
    }

    public getType() {
      return types.VK;
    }
  }
}
