

export interface IRequest {
  getName(): string;
  getData(): Object;
  setData(data: any): void;
}

export interface IAbstractRequest {
  getRequest(type?: string): IRequest;
  getType(): string;
}

export const types = {
  'VK': 'vk'
};
