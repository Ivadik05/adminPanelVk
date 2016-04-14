import * as React from 'react';
import { Container } from '../../../components/container';
let styles = require('./style.css');

export interface IProps extends React.Props<Main> {
  state: any;
  dispatch: Function;
}

export default class Main extends React.Component<IProps, void> {
  public render() {
    return (
        <div className={styles.main}></div>
    );
  }
};
