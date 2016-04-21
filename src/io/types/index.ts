import { BaseResponse } from '../response/response';
export type marketType = {
  id: string,
  ownerId: string,
  title: string,
  description: string,
  price: string,
  category: Object,
  date: Date,
  photo: string
}

export type pagesType = {
  id: string,
  name: string;
  title: string,
  text: string
}

export type executeType = Array<BaseResponse<any>>
