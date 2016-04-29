import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { connect } from 'react-redux';
import { Container } from '../../../components/container';
let styles = require('./style.css');

export interface IProps extends React.Props<ChoppingCart> {
  shoppingCart: any;
  dispatch: IDispatch;
}

class ChoppingCart extends React.Component<IProps, {}> {
  public render() {
    return (
        <div className={styles.shoppingCart}>
          <Container>
            <h1>Корзина</h1>
          </Container>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  shoppingCart: state.market.shoppingCart
});

export default connect(mapStateToProps)(ChoppingCart);
