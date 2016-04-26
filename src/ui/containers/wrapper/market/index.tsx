import * as React from 'react';
import { Container } from '../../../components/container';
import { Link, browserHistory } from 'react-router';
import { Markup } from '../../../components/markup';
import { connect } from 'react-redux';
import { Dispatch as IDispatch } from 'redux';
import { utils } from '../../../../utils';
import { routeConstants } from '../../../../routes';
import { actionCreators } from '../../../action-creators';
import * as Helmet from 'react-helmet';
import { marketType } from '../../../../io/types';
import ProductDetail from '../../../components/product-detail';
let styles = require('./style.css');

export interface IProps {
  params: Object;
  market: any;
  dispatch: IDispatch;
}

class Market extends React.Component<IProps , {}> {
  constructor(props) {
    super(props);
  }

  public getProduct(productId: string): marketType {
    return this.props.market.data.filter(item => {
      console.error(item.id);
      return String(item.id) === String(productId);
    })[0];
  }

  public render() {
    let markets = this.props.market.data.map((market) => {
      return (
          <div className={styles.marketItem}>
            <div className={styles.inner}>
              <Link to={{ pathname: `${routeConstants.MARKET}/${market.id}`}} activeClassName={styles.active}>
                <div className={styles.marketPhoto}>
                  <img src={market.photo} alt={market.title}/>
                </div>
                <div className={styles.name}>
                  <span>
                    {market.title}
                  </span>
                </div>
                <div className={styles.price}>{market.price}</div>
              </Link>
            </div>
          </div>
      );
    });
    // example
    // <div>
    //   <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
    // </div>
    // <button onClick={() => {this.props.dispatch(actionCreators.getMarket());}}>Запрос</button>

    let productDetail = this.getProduct(this.props.params['marketId']);
    return (
        <div className={styles.market} onClick={() => {this.props.dispatch(actionCreators.getMarket());}}>
          <Helmet
              title='Магазин'
          />
          {productDetail && <ProductDetail {...{productDetail}}/>}
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
