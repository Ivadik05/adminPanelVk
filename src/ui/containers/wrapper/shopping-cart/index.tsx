import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Container } from '../../../components/container';
import {routeConstants} from '../../../../routes/index';
let styles = require('./style.css');

export interface IProps extends React.Props<ChoppingCart> {
  shoppingCart: any;
  dispatch: IDispatch;
}

class ChoppingCart extends React.Component<IProps, {}> {
  public render() {
    let { shoppingCart } = this.props;
    return (
        <div className={styles.shoppingCart}>
          <Container>
            <h1>Корзина</h1>
            {shoppingCart.count ?
              <div>Товары</div>
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
