import * as React from 'react';
import { Logo } from '../logo';
let styles = require('./style.css');

export interface IProps extends React.Props<Header> {
}

export default class Header extends React.Component<IProps, void> {
  public render() {
    return (
        <header className={styles.header}>
          <Logo
            src='https://scontent-arn2-1.cdninstagram.com/t51.2885-15/e35/12912298_1093354044040129_887822122_n.jpg?ig_cache_key=MTIyMDk0ODM0MTY5Mzk1NDE3Nw%3D%3D.2'
          />
        </header>
    );
  }
};
