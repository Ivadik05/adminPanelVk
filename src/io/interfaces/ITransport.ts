

export interface ITransport {
  getType(): string;
  send(
      options: ITransportOptions,
      complete?: Function,
      errorResponse?: Function
  );
}

export interface ITransportOptions {
  method?: string;
  async?: boolean;
  query?: Object;
}
