import * as React from 'react';
import { browserHistory } from 'react-router';
import { marketType } from '../../../io/types';
import { routeConstants } from '../../../routes';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Mobile from '../mobileContent';
let MediaQuery = require('react-responsive');
let Swipeable = require('react-swipeable')
let styles = require('./style.css');
let animation = require('./animation.css');

export interface IProps {
  productDetail: marketType;
}

class Detail extends React.Component<IProps , {}> {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  public onClose() {
    browserHistory.push(routeConstants.MARKET);
  }

  public render() {
    let productDetail: marketType = this.props.productDetail;
    return (
        <div>
          <MediaQuery maxDeviceWidth={600}>
          <ReactCSSTransitionGroup
              transitionEnterTimeout={500}
              transitionLeaveTimeout={700}
              transitionName={ {
                enter: styles.enter,
                enterActive: styles.enterActive,
                leave: styles.leave,
                leaveActive: styles.leaveActive
              } }
          >
            {this.props.productDetail ? (
              <div className={styles.overlay} key={productDetail.id}>
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
              </div>) : null}
          </ReactCSSTransitionGroup>
          </MediaQuery>
          <MediaQuery minDeviceWidth={600}>
            {this.props.productDetail ? (
            <div className={styles.overlay} key={productDetail.id}>
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
            </div>) : null}
          </MediaQuery>
        </div>
    );
  }
}

export default Detail;
