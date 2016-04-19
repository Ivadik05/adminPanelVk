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
      console.error('market', market);
      return (
          <div className={styles.marketItem}>
            <div className={styles.marketPhoto}>
              <img src={market.photo} alt={market.title}/>
            </div>
            <div>Название: {market.title}</div>
            <div>Цена: {market.price}</div>
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
            <br/>
            <div>
              <button onClick={() => {this.props.dispatch(actionCreators.getMarket())}}>Запрос</button>
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
