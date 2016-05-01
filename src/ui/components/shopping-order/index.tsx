import * as React from 'react';
import { connect } from 'react-redux';
let styles = require('./style.css');

export interface IProps extends React.Props<ShoppingOrder> {
  shoppingCart: any;
}

class ShoppingOrder extends React.Component<IProps, {}> {
  public render() {
    return (
        <div className={styles.order}>
          
        </div>
    );
  }
}

const mapStateToProps = state => ({
  shoppingCart: state.market.shoppingCart
});

export default connect(mapStateToProps)(ShoppingOrder);
