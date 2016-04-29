import * as React from 'react';
import { browserHistory } from 'react-router';
import { marketType } from '../../../io/types';
import { routeConstants } from '../../../routes';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button, ButtonList } from '../button';
import Mobile from '../mobileContent';
let MediaQuery = require('react-responsive');
let Swipeable = require('react-swipeable');
let styles = require('./style.css');

export interface IProps {
  productDetail: marketType;
  onRemoveProduct: Function;
  onAddProduct: Function;
}

class Detail extends React.Component<IProps , {}> {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  public onClose() {
    browserHistory.push(routeConstants.MARKET);
  }

  public getDetailContent(productDetail) {
    return (
        <div className={styles.productDetailwrap}>
          <div className={styles.productImg} style={{backgroundImage: `url(${productDetail.photo})`}}>
          </div>
          <div className={styles.productDescription}>
            <div className={styles.detailText}>
              <div className={styles.title}>
                {productDetail.title}
              </div>
              <div className={styles.price}>
                {productDetail.price}
              </div>
              <div className={styles.description}>
                {productDetail.description}
              </div>
            </div>
            <ButtonList align='right'>
              <Button type='error' handler={() => this.props.onRemoveProduct(productDetail)}>Убрать</Button>
              <Button handler={() => this.props.onAddProduct(productDetail)}>Добавить</Button>
            </ButtonList>
          </div>
        </div>
    );
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
                } }>
              {this.props.productDetail ? (
                <div className={styles.overlay} key={productDetail.id}>
                  <div className={styles.productDetail}>
                    <button className={styles.closeButton} onClick={this.onClose}>x</button>
                    {this.getDetailContent(productDetail)}
                  </div>
                </div>) : null}
            </ReactCSSTransitionGroup>
          </MediaQuery>
          <MediaQuery minDeviceWidth={600}>
            {this.props.productDetail ? (
            <div className={styles.overlay} key={productDetail.id}>
              <div className={styles.productDetail}>
                <button className={styles.closeButton} onClick={this.onClose}>x</button>
                {this.getDetailContent(productDetail)}
              </div>
            </div>) : null}
          </MediaQuery>
        </div>
    );
  }
}

export default Detail;
