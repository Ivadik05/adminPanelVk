import * as React from 'react';
import { browserHistory } from 'react-router';
import {marketType, shoppingCart } from '../../../io/types';
import { routeConstants } from '../../../routes';
import { Container } from '../container';
import { Button, ButtonList } from '../button';
let styles = require('./style.css');

export interface IProps {
  shoppingCart: shoppingCart;
  routing: Object;
}

class ShoppingCartBar extends React.Component<IProps , {}> {
  constructor(props) {
    super(props);
    this.transferShoppingCart = this.transferShoppingCart.bind(this);
  }

  public transferShoppingCart() {
    browserHistory.push(routeConstants.SHOPPING_CART);
  }


  public render() {
    let shoppingCart: shoppingCart = this.props.shoppingCart;
    let isShowShoppingCartBar =
        shoppingCart.productsSelected.length &&
        this.props.routing['locationBeforeTransitions'].pathname !== routeConstants.SHOPPING_CART;
    return (
        isShowShoppingCartBar ? (
            <div className={styles.shoppingCartBar}>
              <Container verticalPadding={false}>
                <div className={styles.wrap}>
                  <div className={styles.cart}>
                    <div className={styles.title}>
                      i Корзина
                    </div>
                    <div className={styles.count}>{shoppingCart.count}</div>
                    <div className={styles.sum}>
                      {shoppingCart.sum} руб.
                    </div>
                    <Button handler={this.transferShoppingCart}>Перейти в корзину</Button>
                  </div>
                </div>
              </Container>
            </div>
        ) : null
    );
  }
}

export default ShoppingCartBar;
