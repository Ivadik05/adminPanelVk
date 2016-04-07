

export interface IRequest {
  getType(): string;
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
