import * as React from 'react';
import { Link, IndexLink } from 'react-router';
import { routeConstants } from '../../../routes';


let classNames = require('classnames');
let styles = require('./style.css');

export interface IProps extends React.Props<Nav> {
  getAbout: Function;
}

interface IState {
  isOpenMenu?: boolean;
}

export default class Nav extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isOpenMenu: false
    };

    this.clickButton = this.clickButton.bind(this);
  }

  public toggleMenu(menuState) {
    this.setState({
      isOpenMenu: !menuState
    });
  }

  public clickButton() {
    console.error('click');
    this.toggleMenu(this.state.isOpenMenu);
  }

  public render() {
    return (
        <div className={classNames(styles.navigation, {[styles.open]: this.state.isOpenMenu})}>
          <ul onClick={this.clickButton}>
            <li>
              <button className={styles.navItem} onClick={this.clickButton}>
                <IndexLink to={routeConstants.INDEX} activeClassName={styles.active}>Главная</IndexLink>
              </button>
            </li>
            <li>
              <button className={styles.navItem} onClick={this.clickButton}>
                <Link to={routeConstants.ABOUT} activeClassName={styles.active}>О нас</Link>
              </button>
            </li>
            <li>
              <button className={styles.navItem} onClick={this.clickButton}>
                <Link to={routeConstants.MARKET} activeClassName={styles.active}>Магазин</Link>
              </button>
            </li>
            <li>
              <button className={styles.navItem} onClick={this.clickButton}>
                <Link to={routeConstants.CONTACTS} activeClassName={styles.active}>Контакты</Link>
              </button>
            </li>
            <li>
              <button className={styles.navItem} onClick={this.clickButton}>
                <Link to={routeConstants.DELIVERY} activeClassName={styles.active}>Оплата и доставка</Link>
              </button>
            </li>
          </ul>
          <button className={styles.openButton} onClick={this.clickButton}>
            <span></span>
          </button>
        </div>
    );
  }
};
