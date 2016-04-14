import * as React from 'react';
import { Container } from '../../../components/container';
import { actionCreators } from '../../../action-creators';
import { Markdown } from '../../../components/markdown';
let styles = require('./style.css');

export interface IProps extends React.Props<Market> {

}

export default class Market extends React.Component<IProps, void> {
  constructor(props) {
    super(props)
  }

  public render() {
    // let markets = state.market.data.map((market) => {
    //   return (
    //       <div>
    //         <div>Название: {market.title}</div>
    //         <div>Цена: {market.price}, как же дорого</div>
    //         <Markdown
    //             str={market.title}
    //         />
    //       </div>
    //   );
    // });
    return (
        <div className={styles.market}>
          <Container>
            МАГАЗИН
          </Container>
        </div>
    );
  }
};
