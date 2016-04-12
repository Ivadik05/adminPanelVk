import * as React from 'react';

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
