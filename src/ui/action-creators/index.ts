import { ActionCreator } from 'redux';
import { events } from '../../events';
import { marketType } from '../../io/types';

export module actionCreators {
  export function getMarket<ActionCreator>() {
    return {
      type: events.market.GET_MARKET
    };
  }
  export function getAbout<ActionCreator>() {
    return {
      type: events.about.GET_ABOUT
    };
  }

  export function removeProductInCart<ActionCreator>(productDetail: marketType) {
    return {
      type: events.market.REMOVE_PRODUCT,
      payload: productDetail
    };
  }

  export function addProductInCart<ActionCreator>(productDetail: marketType) {
    return {
      type: events.market.ADD_PRODUCT,
      payload: productDetail
    };
  }
}
