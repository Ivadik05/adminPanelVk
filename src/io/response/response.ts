import {IResponse, types} from '../interfaces';

export module response {
  'use strict';

  class Response implements IResponse {
    private data: string;
    private type: string;

    constructor(type: string, data: string) {
      this.type = type;
      this.data = data;
    }

    public getType() {
      return this.type;
    }

    public getData() {
      return this.data;
    }
  }
}
