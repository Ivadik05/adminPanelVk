import * as React from 'react';
let styles = require('./style.css');

export interface IProps extends React.Props<Footer> {
}

export default class Footer extends React.Component<IProps, void> {
  public render() {
    return (
        <footer className={styles.footer}>
          Footer
        </footer>
    );
  }
};
