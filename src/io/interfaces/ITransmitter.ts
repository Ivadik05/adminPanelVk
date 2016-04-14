

export interface ITransmitter {
  setHost(src: string);
  setMethod(method: string);
  addHeader(name: string, value: string);
  removeHeader(name: string);
  setData(data: any): void;
  send(complete?: Function, errorResponse?: Function);
  abort();
}
