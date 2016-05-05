import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, ButtonList } from '../../../../components/button';
import { Container } from '../../../../components/container';
import { actionCreators } from '../../../../action-creators';
import {orderType} from '../../../../../io/types/index';
let styles = require('./style.css');

export interface IProps extends React.Props<ShoppingOrder> {
  shoppingCart: any;
  dispatch: IDispatch;
}

class ShoppingOrder extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.onAcceptOrder = this.onAcceptOrder.bind(this);
  }

  public refs: {
    [key: string]: (Element);
    name: (HTMLInputElement);
    phone: (HTMLInputElement);
    email: (HTMLInputElement);
  };

  public onAcceptOrder() {
    let { dispatch } = this.props;
    let order: orderType = {
      name: this.refs.name.value,
      phone: this.refs.phone.value,
      email: this.refs.email.value,
      delivery: {
        method: 'current'
      }
    };
    dispatch(actionCreators.acceptOrder(order));
  }

  public render() {
    return (
        <div className={styles.order}>
          <Container>
            <h1>Оформление заказа</h1>
            <div className={styles.orderContacts}>
              <h3>Контактная информация</h3>
              <input type='text' placeholder='Имя' ref='name'/>
              <input type='text' placeholder='Телефон' ref='phone'/>
              <input type='text' placeholder='E-mail' ref='email'/>
            </div>
            <div className={styles.orderDelivery}>
              <h3>Способ доставки</h3>
            </div>
            <div className={styles.orderDelivery}>
              <h3>Способ оплаты</h3>
            </div>
            <ButtonList align='right'>
              <Button
                  handler={this.onAcceptOrder}
              >
                Подтвердить заказ
              </Button>
            </ButtonList>
          </Container>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  shoppingCart: state.market.shoppingCart
});

export default connect(mapStateToProps)(ShoppingOrder);
