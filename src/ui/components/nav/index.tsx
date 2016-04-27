import * as React from 'react';
import { Link, IndexLink } from 'react-router';
import { routeConstants } from '../../../routes';
let classNames = require('classnames');
import * as Helmet from 'react-helmet';
let styles = require('./style.css');

export interface IProps extends React.Props<Nav> {
  routing: Object;
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
    this.onScroll = this.onScroll.bind(this);
  }

  public toggleMenu(menuState) {
    this.setState({
      isOpenMenu: !menuState
    });
  }

  public clickButton() {
    this.toggleMenu(this.state.isOpenMenu);
  }

  public onScroll() {}

  public componentWillUpdate(nextProps, nextState) {
    if (nextProps.routing['locationBeforeTransitions'].pathname !==
        this.props.routing['locationBeforeTransitions'].pathname) {
      this.toggleMenu(true);
    }
    window.addEventListener('scroll', this.onScroll, true);
  }
// <Link to={{ pathname: '/market/bob', query: { showAge: true } }} activeClassName={styles.active}>Market With Query Params</Link>
  public render() {
    return (
        <div className={classNames(styles.navigation, {[styles.open]: this.state.isOpenMenu})}>
          {this.state.isOpenMenu && <Helmet meta={[{'name': 'theme-color', content: '#333'}]}/>}
          <ul>
            <li>
              <div className={styles.navItem}>
                <IndexLink to={routeConstants.INDEX} activeClassName={styles.active}>Главная</IndexLink>
              </div>
            </li>
            <li>
              <div className={styles.navItem}>
                <Link to={routeConstants.ABOUT} activeClassName={styles.active}>О нас</Link>
              </div>
            </li>
            <li>
              <div className={styles.navItem}>
                <Link to={routeConstants.MARKET} activeClassName={styles.active}>Магазин</Link>
              </div>
            </li>
            <li>
              <div className={styles.navItem}>
                <Link to={routeConstants.DELIVERY} activeClassName={styles.active}>Оплата и доставка</Link>
              </div>
            </li>
            <li>
              <div className={styles.navItem}>
                <Link to={routeConstants.CONTACTS} activeClassName={styles.active}>Контакты</Link>
              </div>
            </li>
          </ul>
          <div className={styles.mobileOverlay} onClick={() => this.toggleMenu(true)}></div>
          <button className={styles.openButton} onClick={this.clickButton}>
            <span className={styles.hamb1} />
            <span className={styles.hamb2} />
            <span className={styles.hamb3} />
          </button>
        </div>
    );
  }
};
