import * as React from 'react';
import store from '../../../../store';
import { actionCreators } from '../../../action-creators';

export interface IProps extends React.Props<Market> {

}

export default class Market extends React.Component<IProps, void> {
  public render() {
    let state = store.getState();
    let dispatch = store.dispatch;
    let markets = state.market.data.map((market) => {
      return (
          <div>
            <div>Название: {market.title}</div>
            <div>Цена: {market.price}</div>
          </div>
      );
    });
    return (
        <div>
          МАГАЗИН
          <button onClick={() => dispatch(actionCreators.getMarket())}>Запросить товары</button>
          {markets}
        </div>
    );
  }
};
