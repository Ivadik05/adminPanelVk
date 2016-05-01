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
    this.onAddProduct = this.onAddProduct.bind(this);
  }

  public getProduct(productId: string): marketType {
    return this.props.market.data.filter(item => {
      return String(item.id) === String(productId);
    })[0];
  }

  public getProductQuantity(productId: string): marketType {
    let { productsSelected } = this.props.market.shoppingCart;
    let product = productsSelected.filter(item => {
      return String(item.id) === String(productId);
    })[0];
    if (product) {
      return product.quantity;
    }
    return null;
  }

  // public getProductShoppingCart(productId: string): marketType {
  //   return this.props.market.shoppingCart['products'].filter(item => {
  //     return String(item.id) === String(productId);
  //   })[0];
  // }

  public freezeWindow() {
    let productDetail = this.getProduct(this.props.params['marketId']);
    if (productDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  public openProduct(productId) {
    return () => {
      browserHistory.push(routeConstants.MARKET + '/' + productId);
    };
  }

  public componentDidMount() {
    this.freezeWindow();
  }

  public componentDidUpdate() {
    this.freezeWindow();
  }

  public onAddProduct(productDetail: marketType) {
    let { dispatch } = this.props;
    dispatch(actionCreators.addProductInCart(productDetail));
  }

  public render() {
    let markets = this.props.market.data.map((market, i) => {
      return (
          <div className={styles.marketItem} key={i}>
            <button className={styles.inner} onClick={this.openProduct(market.id)}>
              <div className={styles.marketPhoto}>
                <img src={market.photo} alt={market.title}/>
              </div>
              <div className={styles.name}>
                <span>
                  {market.title}
                </span>
              </div>
              <div className={styles.price}>{market.price}</div>
            </button>
          </div>
      );
    });
    let productDetail = this.getProduct(this.props.params['marketId']);
    // example
    // <div>
    //   <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
    // </div>
    // <button onClick={() => {this.props.dispatch(actionCreators.getMarket());}}>Запрос</button>
    let productQuantity = this.getProductQuantity(this.props.params['marketId']);
    let { market } = this.props;
    return (
        <div className={styles.market}>
          <Helmet
              title='Магазин'
          />
          <ProductDetail
              {...{productDetail}}
              onAddProduct={this.onAddProduct}
              cartCount={productQuantity}
          />
          <Container>
            <Markup
                str={market.contentText} />
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
