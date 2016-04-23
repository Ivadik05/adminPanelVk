import * as React from 'react';
import { Container } from '../../../components/container';
import { actionCreators } from '../../../action-creators';
import { Markup } from '../../../components/markup';
import { connect } from 'react-redux';
import { Dispatch as IDispatch } from 'redux';
import { utils } from '../../../../utils';
let styles = require('./style.css');

export interface IProps {
  market: any;
  dispatch: IDispatch;
}

class Market extends React.Component<IProps , {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    let markets = this.props.market.data.map((market) => {
      return (
          <div className={styles.marketItem}>
            <div className={styles.inner}>
              <div className={styles.marketPhoto}>
                <img src={market.photo} alt={market.title}/>
              </div>
              <div>Название: {market.title}</div>
              <div>Цена: {market.price}</div>
            </div>
          </div>
      );
    });
    let parts: Array<any> = [];
    let lth = 4;
    function partition(arr) {
      if (arr.length > lth) {
        parts.push(arr.slice(0, lth));
        partition(arr.slice(lth));
      } else {
        arr.length = lth;
        parts.push(arr.slice(0, lth));
      }
    }
    // markets = markets.concat(markets).splice(1);
    // partition(markets);
    parts = parts.map((part) => {
      return (
          <div className={styles.row}>
            {markets}
          </div>
      );
    });
    return (
        <div className={styles.market}>
          <Container>
            <Markup
                str={this.props.market.contentText} />
            <div className={styles.marketList}>
              {markets}
            </div>
          </Container>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  market: state.market
});

export default connect(mapStateToProps)(Market);
