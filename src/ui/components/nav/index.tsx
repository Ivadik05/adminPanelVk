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
  }

  public toggleMenu(menuState) {
    this.setState({
      isOpenMenu: !menuState
    });
  }

  public clickButton() {
    this.toggleMenu(this.state.isOpenMenu);
  }

  public componentWillUpdate(nextProps, nextState) {
    if (nextProps.routing['locationBeforeTransitions'].pathname !==
        this.props.routing['locationBeforeTransitions'].pathname) {
      this.toggleMenu(true);
    }
  }

  public render() {
    return (
        <div className={classNames(styles.navigation, {[styles.open]: this.state.isOpenMenu})}>
          {this.state.isOpenMenu &&
          <Helmet
              title='My Title'
              titleTemplate='MySite.com - %s'
              meta={[
                    {'name': 'theme-color', content: '#333'}
                ]}
              link={[
                    {'rel': 'canonical', 'href': 'http://mysite.com/example'},
                    {'rel': 'apple-touch-icon', 'href': 'http://mysite.com/img/apple-touch-icon-57x57.png'},
                ]}
              onChangeClientState={(newState) => console.log(newState)}
          />}
          <ul>
            <li>
              <button className={styles.navItem}>
                <IndexLink to={routeConstants.INDEX} activeClassName={styles.active}>Главная</IndexLink>
              </button>
            </li>
            <li>
              <button className={styles.navItem}>
                <Link to={routeConstants.ABOUT} activeClassName={styles.active}>О нас</Link>
              </button>
            </li>
            <li>
              <button className={styles.navItem}>
                <Link to={routeConstants.MARKET} activeClassName={styles.active}>Магазин</Link>
              </button>
            </li>
            <li>
              <button className={styles.navItem}>
                <Link to={routeConstants.DELIVERY} activeClassName={styles.active}>Оплата и доставка</Link>
              </button>
            </li>
            <li>
              <button className={styles.navItem}>
                <Link to={routeConstants.CONTACTS} activeClassName={styles.active}>Контакты</Link>
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
