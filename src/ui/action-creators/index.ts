import { ActionCreator } from 'redux';
import { events } from '../../events';

export module actionCreators {
  export function getMarket<ActionCreator>() {
    return {
      type: events.market.GET_MARKET
    };
  }
}
