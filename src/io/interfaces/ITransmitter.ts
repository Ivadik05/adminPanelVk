

export interface ITransmitter {
  getType(): string;
  send(
      options: ITransmitterOptions,
      complete?: Function,
      errorResponse?: Function
  );
}

export interface ITransmitterOptions {
  method?: string;
  async?: boolean;
  query?: Object;
}
