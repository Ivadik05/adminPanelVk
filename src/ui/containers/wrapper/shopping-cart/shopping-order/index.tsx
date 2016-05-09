import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, ButtonList } from '../../../../components/button';
import { Validate } from '../../../../components/validate';
import { CardType, CardSelect } from '../../../../components/card';
import { Container } from '../../../../components/container';
import { actionCreators } from '../../../../action-creators';
import {orderType} from '../../../../../io/types/index';
import { routeConstants } from '../../../../../routes';
import { browserHistory } from 'react-router';
let styles = require('./style.css');

interface IProps extends React.Props<ShoppingOrder> {
  shoppingCart: any;
  successOrder: boolean;
  dispatch: IDispatch;
}

interface IState {
  name?: string;
  phone?: string;
  email?: string;
  deliveryMethod?: 'current' | 'courier';
  deliveryMethodText?: string;
  paymentMethod?: 'cash' | 'nocash' | 'post';
  paymentMethodText?: string;
  valid?: boolean;
}

class ShoppingOrder extends React.Component<IProps, IState> {
  private timer: number;

  constructor(props) {
    super(props);
    this.onAcceptOrder = this.onAcceptOrder.bind(this);
    this.onChangeDelivery = this.onChangeDelivery.bind(this);
    this.onChangePayment = this.onChangePayment.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.state = {
      name: '',
      phone: '',
      email: '',
      deliveryMethod: 'current',
      deliveryMethodText: 'Самовывоз',
      paymentMethod: 'nocash',
      paymentMethodText: 'Предоплата',
      valid: false
    };
  }

  public refs: {
    [key: string]: (Element);
  };

  public onAcceptOrder() {
    let { dispatch, shoppingCart } = this.props;
    let order: orderType = {
      visitorInfo: {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      },
      delivery: {
        method: this.state.deliveryMethod,
        methodText: this.state.deliveryMethodText
      },
      payment: {
        method: this.state.paymentMethod,
        methodText: this.state.paymentMethodText
      },
      cart: shoppingCart
    };
    dispatch(actionCreators.acceptOrder(order));
  }

  public updateState(key: string, value) {
    this.setState({
      [key]: value
    });
  }

  public onChangeDelivery(id, text) {
    this.updateState('deliveryMethod', id);
    this.updateState('deliveryMethodText', text);
  }

  public onChangePayment(id, text) {
    this.updateState('paymentMethod', id);
    this.updateState('paymentMethodText', text);
  }

  public onChangeForm(valid) {
    this.updateState('valid', valid);
  }

  public componentDidUpdate() {
    let { successOrder, dispatch } = this.props;
    if (successOrder) {
      this.timer = setTimeout(function () {
        browserHistory.push(`${routeConstants.MARKET}`);
        dispatch(actionCreators.clearCart());
      }, 10000);
    }
  }

  public componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public render() {
    let deliveryCards: Array<CardType> = [
      {
        id: 'current',
        text: 'Самовывоз',
        content: (
            <div>
              <div className={styles.cardTitle}>
                <strong>Самовывоз</strong>
              </div>
              <div className={styles.cardText}>
                от станции метро Звёздная (<strong>бесплатно</strong>)
              </div>
            </div>
        )
      },
      {
        id: 'courier',
        text: 'Доставка до станции метро',
        content: (
            <div>
              <div className={styles.cardTitle}>
                <strong>Доставка</strong>
              </div>
              <div className={styles.cardText}>
                до станции метро (<strong>150 рублей</strong>)
              </div>
            </div>
        )
      },
      {
        id: 'courierCity',
        text: 'Доставка до квартиры',
        content: (
            <div>
              <div className={styles.cardTitle}>
                <strong>Доставка</strong>
              </div>
              <div className={styles.cardText}>
                по СПб в пределах КАД (<strong>300 рублей</strong>)
              </div>
            </div>
        )
      },
      {
        id: 'post',
        text: 'Доставка почтой РФ',
        content: (
            <div>
              <div className={styles.cardTitle}>
                <strong>Доставка почтой РФ</strong>
              </div>
              <div className={styles.cardText}>
                по предоплате или наложенным платежом - (<strong>250 рублей</strong> по Европейской части РФ, в дальние регионы рассчитывается индивидуально + комиссия Почты РФ за наложенный платеж)
              </div>
            </div>
        )
      },
      {
        id: 'transport',
        text: 'Доставка транспортной компанией',
        content: (
            <div>
              <div className={styles.cardTitle}>
                <strong>Доставка транспортной компанией</strong>
              </div>
              <div className={styles.cardText}>
                (рассчитывается индивидуально)
              </div>
            </div>
        )
      }
    ];

    let paymentCards: Array<CardType> = [
      {
        id: 'cash',
        text: 'Наличными',
        content: (
          <div>
            <div className={styles.cardTitle}>
              <strong>Наличными</strong>
            </div>
            <div className={styles.cardText}>
              при доставке (СПб)
            </div>
          </div>
        ),
        visible: (this.state.deliveryMethod === 'current' || this.state.deliveryMethod === 'courier')
      },
      {
        id: 'nocash',
        text: 'Предоплата',
        content: (
          <div>
            <div className={styles.cardTitle}>
              <strong>Предоплата</strong>
            </div>
            <div className={styles.cardText}>
              переводом на карту Сбербанка, Альфа-Банка, Райффайзен, ВТБ, ЯндексДеньги
            </div>
          </div>
        )
      },
      {
        id: 'post',
        text: 'Оплата на почте',
        content: (
          <div>
            <div className={styles.cardTitle}>
              <strong>Оплата на почте</strong>
            </div>
            <div className={styles.cardText}>
              при посылке с наложенным платежом
            </div>
          </div>
        )
      }
    ];
    return (
        <div className={styles.order}>
          {this.props.successOrder &&
          <Container>
            <h1>Готово!</h1>
            Спасибо за заказ. На Вашу почту отправлено письмо с информацией о заказе.
          </Container>}
          {!this.props.successOrder && <Container>
            <h1>Оформление заказа</h1>
            <div className={styles.orderContacts}>
              <h2>Контактная информация</h2>
              <div className={styles.inputsWrap}>
                <Validate.Form onChange={this.onChangeForm}>
                  <Validate.Input
                      name='name'
                      type='text'
                      firstUpper={true}
                      required={true}
                      placeholder='Имя'
                      onChange={(value) => {this.updateState('name', value);}}
                  />
                  <Validate.Input
                      name='phone'
                      type='phone'
                      required={true}
                      placeholder='Телефон'
                      onChange={(value) => {this.updateState('phone', value);}}
                  />
                  <Validate.Input
                      name='email'
                      placeholder='E-mail'
                      type='email'
                      onChange={(value) => {this.updateState('email', value);}}
                  />
                </Validate.Form>
              </div>
            </div>
            <div className={styles.orderDelivery}>
              <h2>Способ доставки</h2>
              <div className={styles.orderCards}>
                <CardSelect
                    cards={deliveryCards}
                    active={this.state.deliveryMethod}
                    onChange={this.onChangeDelivery}/>
              </div>
            </div>
            <div className={styles.orderPayment}>
              <h2>Способ оплаты</h2>
              <div className={styles.orderCards}>
                <CardSelect
                    cards={paymentCards}
                    active={this.state.paymentMethod}
                    onChange={this.onChangePayment}/>
              </div>
            </div>
            <ButtonList align='right'>
              <Button
                  disabled={!this.state.valid}
                  handler={this.onAcceptOrder}
              >
                Подтвердить заказ
              </Button>
            </ButtonList>
          </Container>}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  shoppingCart: state.market.shoppingCart,
  successOrder: state.market.successOrder
});

export default connect(mapStateToProps)(ShoppingOrder);
