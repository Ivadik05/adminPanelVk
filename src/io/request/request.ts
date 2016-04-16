import {IRequest, IAbstractRequest, types} from '../interfaces';

export module request {
  'use strict';
  export class BaseRequest implements IRequest {
    private name: string;
    private saverEvent: string;
    private requestData: Object;

    constructor(name: string, saverEvent: string) {
      this.name = name;
      this.saverEvent = saverEvent;
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

    public getSaverEvent() {
      return this.saverEvent;
    }

    public setData(data) {
      this.requestData = data;
    }
  }

  export class VK extends BaseRequest implements IRequest, IAbstractRequest {
    constructor(name: string, saverEvent: string) {
      super(name, saverEvent);
    }

    public getRequest() {
      return this;
    }

    public getType() {
      return types.VK;
    }
  }
}
