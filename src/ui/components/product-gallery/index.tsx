import * as React from 'react';
import { browserHistory } from 'react-router';
import { marketType } from '../../../io/types';
import { routeConstants } from '../../../routes';
import { Button, ButtonList } from '../button';
let classNames = require('classnames');
let styles = require('./style.css');

interface IProps {
  photos: Array<string>;
}

interface IState {
  active?: string;
}

class ProductGallery extends React.Component<IProps , IState> {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.photos[0]
    };

    this.miniPhotoHandler = this.miniPhotoHandler.bind(this);
  }

  public miniPhotoHandler(photo) {
    this.setState({
      active: photo
    });
  }

  public render() {
    let { photos } = this.props;
    let photosList = photos.map(photo => (
        <div className={classNames(styles.miniPhoto, {[styles.active]: photo === this.state.active})}
             style={{backgroundImage: `url(${photo})`}} onClick={() => this.miniPhotoHandler(photo)}></div>
    ));
    return (
        <div className={styles.productGallery}>
          <div className={styles.productImg} style={{backgroundImage: `url(${this.state.active})`}}></div>
          <div className={styles.productImgList}>
            {photosList}
          </div>
        </div>
    );
  }
}

export default ProductGallery;
