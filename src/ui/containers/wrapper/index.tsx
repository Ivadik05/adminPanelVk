import * as React from 'react';
import Header from '../../components/header';

export interface IProps extends React.Props<Wrapper> {
  state: any;
  dispatch: Function;
}

export default class Wrapper extends React.Component<IProps, void> {
  public render() {
    return (
        <div>
          <Header/>
          {this.props.children}
        </div>
    );
  }
};
