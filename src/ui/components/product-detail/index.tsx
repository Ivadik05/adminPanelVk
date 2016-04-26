import * as React from 'react';
import { browserHistory } from 'react-router';
import { marketType } from '../../../io/types';
import { routeConstants } from '../../../routes';
let styles = require('./style.css');

export interface IProps {
  productDetail: marketType;
}

class ProductDetail extends React.Component<IProps , {}> {
  constructor(props) {
    super(props);
  }

  public onClose() {
    browserHistory.push(routeConstants.MARKET);
  }

  public render() {
    let productDetail: marketType = this.props.productDetail;
    return (
        <div className={styles.overlay}>
          <div className={styles.productDetail}>
            <button className={styles.closeButton} onClick={this.onClose}>x</button>
            <div className={styles.productDetailwrap}>
              <div className={styles.productImg} style={{backgroundImage: `url(${productDetail.photo})`}}>

              </div>
              <div className={styles.productDescription}>
                {productDetail.title}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ProductDetail;
