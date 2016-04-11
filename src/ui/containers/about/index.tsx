import * as React from 'react';

export interface IProps extends React.Props<About> {
  state: any;
  dispatch: Function;
}

export default class About extends React.Component<IProps, void> {
  public render() {
    return (
        <div>
          ABOUT
        </div>
    );
  }
};
