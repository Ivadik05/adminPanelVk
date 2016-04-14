import * as React from 'react';
let styles = require('./style.css');
import { Link, IndexLink } from 'react-router';

export interface IProps extends React.Props<Nav> {
}

export default class Nav extends React.Component<IProps, void> {
  public render() {
    return (
        <ul className={styles.navigation}>
          <li>
            <button className={styles.navItem}>
              <IndexLink to={`/`} activeClassName={styles.active}>Главная</IndexLink>
            </button>
          </li>
          <li>
            <button className={styles.navItem}>
              <Link to={`/about`} activeClassName={styles.active}>О нас</Link>
            </button>
          </li>
          <li>
            <button className={styles.navItem}>
              <Link to={`/market`} activeClassName={styles.active}>Магазин</Link>
            </button>
          </li>
          <li>
            <button className={styles.navItem}>
              <Link to={`/contacts`} activeClassName={styles.active}>Контакты</Link>
            </button>
          </li>
        </ul>
    );
  }
};
