import * as React from 'react';
import { browserHistory } from 'react-router';
import {marketType, shoppingCart } from '../../../io/types';
import { routeConstants } from '../../../routes';
import { Container } from '../container';
import { Button } from '../button';
import { Icon, iconList } from '../icon';
let styles = require('./style.css');

export interface IProps {
  shoppingCart: shoppingCart;
  isShopCart: boolean;
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
    return (
        this.props.isShopCart ? (
            <div className={styles.shoppingCartBar}>
              <Container verticalPadding={false}>
                <div className={styles.wrap}>
                  <div className={styles.cart}>
                    <div className={styles.title}>
                      <div className={styles.titleIcon}>
                        <Icon params={iconList.iconCart}></Icon>
                      </div>
                    </div>
                    <div className={styles.count}>{shoppingCart.count}</div>
                    <div className={styles.sum}>
                      {shoppingCart.sum} руб.
                    </div>
                    <Button handler={this.transferShoppingCart}>Перейти в корзину</Button>
                  </div>
                  <div className={styles.cartSocial}>
                    <a href='https://www.instagram.com/vse_vzaimo_svyazano/' target='_blank' className={styles.cartLink}>
                      <Icon params={iconList.iconInsta}></Icon>
                    </a>
                    <a href='http://vk.com/vse_vzaimo_svyazano' target='_blank' className={styles.cartLink}>
                      <Icon params={iconList.iconVK}></Icon>
                    </a>
                  </div>
                </div>
              </Container>
            </div>
        ) : null
    );
  }
}

export default ShoppingCartBar;
