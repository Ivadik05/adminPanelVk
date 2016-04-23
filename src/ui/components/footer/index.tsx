import * as React from 'react';
let styles = require('./style.css');

export interface IProps extends React.Props<Footer> {
}

export default class Footer extends React.Component<IProps, void> {
  public render() {
    return (
        <footer className={styles.footer}>
          <a href='https://www.instagram.com/vse_vzaimo_svyazano/' target='_blank' className={styles.linkInsta}></a>
        </footer>
    );
  }
};
