import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, ButtonList } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { CardType, CardSelect } from '../../../../components/card';
import { Container } from '../../../../components/container';
import { actionCreators } from '../../../../action-creators';
import {orderType} from '../../../../../io/types/index';
let styles = require('./style.css');

interface IProps extends React.Props<ShoppingOrder> {
  shoppingCart: any;
  dispatch: IDispatch;
}

interface IState {
  name?: string;
  phone?: string;
  email?: string;
  deliveryMethod?: 'current' | 'courier';
  paymentMethod?: string;
}

class ShoppingOrder extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.onAcceptOrder = this.onAcceptOrder.bind(this);
    this.state = {
      name: '',
      phone: '',
      email: '',
      deliveryMethod: 'current',
      paymentMethod: 'cash'
    };
  }

  public refs: {
    [key: string]: (Element);
  };

  public onAcceptOrder() {
    let { dispatch } = this.props;
    let order: orderType = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      delivery: {
        method: 'current'
      }
    };
    dispatch(actionCreators.acceptOrder(order));
  }

  public updateState(key: string, value) {
    this.setState({
      [key]: value
    });
  }

  public render() {
    let deliveryCards: Array<CardType> = [
      {
        id: 'current',
        content: (<div>Самовывоз от метро звёздная</div>)
      },
      {
        id: 'courier',
        content: (<div>Доставка до станции метро</div>)
      }
    ];

    let paymentCards: Array<CardType> = [
      {
        id: 'cash',
        content: (<div>Наличными при доставке (СПб)</div>)
      },
      {
        id: 'nocash',
        content: (<div>Предоплата переводом на карту Сбербанка, Альфа-Банка, Райффайзен, ВТБ, ЯндексДеньги</div>)
      },
      {
        id: 'post',
        content: (<div>Оплата на почте (при посылке с наложенным платежом)</div>)
      }
    ];

    return (
        <div className={styles.order}>
          <Container>
            <h1>Оформление заказа</h1>
            <div className={styles.orderContacts}>
              <h3>Контактная информация</h3>
              <div className={styles.inputsWrap}>
                <Input placeholder='Имя' onChange={(value) => {this.updateState('name', value);}}/>
                <Input type='phone' placeholder='Телефон' onChange={(value) => {this.updateState('phone', value);}}/>
                <Input placeholder='E-mail' onChange={(value) => {this.updateState('email', value);}}/>
              </div>
            </div>
            <div className={styles.orderDelivery}>
              <h3>Способ доставки</h3>
              <div className={styles.orderCards}>
                <CardSelect
                    cards={deliveryCards}
                    active={this.state.deliveryMethod}
                    onChange={(id) => {this.updateState('deliveryMethod', id);}}/>
              </div>
            </div>
            <div className={styles.orderPayment}>
              <h3>Способ оплаты</h3>
              <div className={styles.orderCards}>
                <CardSelect
                    cards={paymentCards}
                    active={this.state.paymentMethod}
                    onChange={(id) => {this.updateState('paymentMethod', id);}}/>
              </div>
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
