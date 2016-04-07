import * as React from 'react';
import { marketType } from '../io/types';

export interface IProps extends React.Props<App> {
  state: any;
  dispatch: Function;
}

export default class App extends React.Component<IProps, void> {
    public render() {
      let { market } = this.props.state;
      let marketItems = market.data.map((item: marketType, i) => {
        return (
            <div className='div' key={i}>
              <div>Товар:</div>
              <div>Название: {item.title}</div>
              <div>Описание: {item.description}</div>

              <div>Цена: {item.price}</div>
              <div>Фото: <img style={{height: '50px'}} src={item.photo} alt=''/></div>
            </div>
        );
      });
      return <div>
        {marketItems}
      </div>;
    }
};
