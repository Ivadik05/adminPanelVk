import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Container } from '../../../components/container';
import { IncDec } from '../../../components/incDec';
import {routeConstants} from '../../../../routes/index';
let styles = require('./style.css');

export interface IProps extends React.Props<ChoppingCart> {
  shoppingCart: any;
  dispatch: IDispatch;
}

class ChoppingCart extends React.Component<IProps, {}> {
  public render() {
    let { shoppingCart } = this.props;
    let products = shoppingCart.productsSelected.map(item => {
      let product = item.product;
      let quantity = item.quantity;
      return (
        <div className={styles.product} key={item.id}>
          <div className={styles.productInfo}>
            <div className={styles.productPhoto} style={{backgroundImage: `url(${product.photo})`}}></div>
            <div className={styles.productDescriptionWrap}>
              <div className={styles.productTitle}><Link to={`${routeConstants.MARKET}/${item.id}`} target='_blank'>{product.title}</Link></div>
              <div className={styles.productDescription}>{product.description}</div>
            </div>
          </div>
          <div className={styles.productQuantity}>
            <IncDec
                count={quantity}
                incHandler={()=>{console.error('inc')}}
                decHandler={()=>{console.error('dec')}}
            />
          </div>
          <div className={styles.productPrice}>
            <div className={styles.price}>
              {product.price}
            </div>
          </div>
          <div className={styles.productButtons}>
            <a href='#'>Удалить</a>
          </div>
        </div>
      );
    });

    console.error('shoppingCart', shoppingCart);
    return (
        <div className={styles.shoppingCart}>
          <Container>
            <h1>Корзина</h1>
            {shoppingCart.count ?
              <div>
                <div className={styles.listHeader}>
                  <div className={styles.productInfo}>Товар</div>
                  <div className={styles.productQuantity}>Количество</div>
                  <div className={styles.productPrice}>Цена</div>
                  <div className={styles.productButtons}></div>
                </div>
                <div className={styles.productsList}>
                  {products}
                </div>
              </div>
                :
              <div>В корзине ничего нет. Сначала нужно выбрать <Link to={routeConstants.MARKET} >товары</Link></div>}
          </Container>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  shoppingCart: state.market.shoppingCart
});

export default connect(mapStateToProps)(ChoppingCart);
