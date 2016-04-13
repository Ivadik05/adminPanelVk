import * as React from 'react';
let styles = require('./style.css');

export interface IProps extends React.Props<Wrapper> {
  state: any;
  dispatch: Function;
}

export default class Wrapper extends React.Component<IProps, void> {
  public render() {
    return (
        <main className={styles.wrapper}>
          {this.props.children}
        </main>
    );
  }
};
