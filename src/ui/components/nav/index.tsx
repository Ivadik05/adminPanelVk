import * as React from 'react';
let styles = require('./style.css');
import { Link } from 'react-router';

export interface IProps extends React.Props<Nav> {
}

export default class Nav extends React.Component<IProps, void> {
  public render() {
    return (
        <ul className={styles.navigation}>
          <li>
            <button>
              <Link to={`/`}>Главная</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to={`/about`}>О нас</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to={`/market`}>Магазин</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to={`/contacts`}>Контакты</Link>
            </button>
          </li>
        </ul>
    );
  }
};
