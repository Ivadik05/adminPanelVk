import * as React from 'react';
import { browserHistory } from 'react-router';
import { marketType } from '../../../io/types';
import { routeConstants } from '../../../routes';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Mobile from '../mobileContent';
let styles = require('./style.css');
let animation = require('./animation.css');

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
      <ReactCSSTransitionGroup
          transitionName={animation}
          transitionEnterTimeout={1500}
          transitionLeaveTimeout={1500}
      >
        {this.props.productDetail && (
        <div className={styles.overlay} key={productDetail.id}>
          <Mobile visible={false}>
              <div>ТЕКСТ НА МОБИЛЕ</div>
          </Mobile>
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
        </div>)}
      </ReactCSSTransitionGroup>
    );
  }
}

export default ProductDetail;
