import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Container } from '../../../components/container';
import { IncDec } from '../../../components/incDec';
import { actionCreators } from '../../../action-creators';
import { routeConstants } from '../../../../routes/index';
import { marketType } from '../../../../io/types';
let styles = require('./style.css');

export interface IProps extends React.Props<ChoppingCart> {
  params: Object;
  shoppingCart: any;
  dispatch: IDispatch;
}

class ChoppingCart extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.onRemoveProductItem = this.onRemoveProductItem.bind(this);
    this.onRemoveProduct = this.onRemoveProduct.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
  }

  public onRemoveProductItem(productDetail: marketType) {
    let { dispatch } = this.props;
    dispatch(actionCreators.removeProductItemInCart(productDetail));
  }

  public onRemoveProduct(productDetail: marketType) {
    let { dispatch } = this.props;
    dispatch(actionCreators.removeProductInCart(productDetail));
  }

  public onAddProduct(productDetail: marketType) {
    let { dispatch } = this.props;
    dispatch(actionCreators.addProductInCart(productDetail));
  }

  public getProducts() {
    let { shoppingCart } = this.props;
    return shoppingCart.productsSelected.map(item => {
      let product = item.product;
      let quantity = item.quantity;
      return (
          <div className={styles.product} key={item.id}>
            <div className={styles.productInfo}>
              <div className={styles.productPhoto} style={{backgroundImage: `url(${product.photo})`}}></div>
              <div className={styles.productDescriptionWrap}>
                <div className={styles.productTitle}>
                  <Link to={`${routeConstants.MARKET}/${item.id}`} target='_blank'>{product.title}</Link>
                </div>
                <div className={styles.productDescription}>{product.description}</div>
              </div>
            </div>
            <div className={styles.productQuantity}>
              <IncDec
                  count={quantity}
                  incHandler={() => this.onAddProduct(product)}
                  decHandler={() => this.onRemoveProductItem(product)}
              />
            </div>
            <div className={styles.productPrice}>
              <div className={styles.price}>
                {product.price}
              </div>
            </div>
            <div className={styles.productButtons}>
              <a onClick={() => this.onRemoveProduct(product)}>Удалить</a>
            </div>
          </div>
      );
    });
  }

  public getCart() {
    let { shoppingCart } = this.props;
    return (
        <Container>
          <h1>Корзина</h1>
          {shoppingCart.count ?
              <div>
                <div className={styles.productsList}>
                  {this.getProducts()}
                </div>
              </div>
              :
              <div>В корзине ничего нет. Сначала нужно выбрать <Link to={routeConstants.MARKET} >товары</Link></div>}
        </Container>
    );
  }

  public componentDidUpdate() {
    let { shoppingCart } = this.props;
    // TODO refuck
    if (this.props['location'].pathname.indexOf(routeConstants.SHOPPING_CART_ORDER) !== -1) {
      if (!shoppingCart.count) {
        browserHistory.replace(routeConstants.SHOPPING_CART);
      }
    }
  }

  public render() {
    let { children } = this.props;
    // <div className={styles.listHeader}>
    //   <div className={styles.productInfo}>Товар</div>
    //   <div className={styles.productQuantity}>Количество</div>
    //   <div className={styles.productPrice}>Цена</div>
    //   <div className={styles.productButtons}></div>
    // </div>
    return (
        <div className={styles.shoppingCart}>
          {children ? children : this.getCart()}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  shoppingCart: state.market.shoppingCart
});

export default connect(mapStateToProps)(ChoppingCart);
