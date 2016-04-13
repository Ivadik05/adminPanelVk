import * as React from 'react';
import { Link } from 'react-router';

export interface IProps extends React.Props<Main> {
  state: any;
  dispatch: Function;
}

export default class Main extends React.Component<IProps, void> {
  public render() {
    return (
        <div>
          MAIN
        </div>
    );
  }
};
