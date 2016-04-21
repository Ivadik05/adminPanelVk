export interface IResponse<TResponse> {
  getName(): string;
  getData(): TResponse;
  setData(data: TResponse);
}
