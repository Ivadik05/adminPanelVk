import * as React from 'react';
import { marketType } from '../io/types';
import { uiState } from '../constants';
import { Router, Route, browserHistory } from 'react-router'
// import { syncHistory } from 'react-router-redux'

export interface IProps extends React.Props<App> {
  state: any;
  dispatch: Function;
}

// const history = syncHistory(browserHistory);
export default class App extends React.Component<IProps, void> {
    public render() {
      let { app } = this.props.state;
      switch (app.uiState) {
        case uiState.MAIN:
          return (
              <div></div>
          );
        default: return <div></div>;
      }
    }
};
