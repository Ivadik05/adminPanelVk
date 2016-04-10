import * as React from 'react';
import { marketType } from '../io/types';
import { uiState } from '../constants';
import { Router, Route, browserHistory } from 'react-router'
// import { syncHistory } from 'react-router-redux'
import store from '../store';

export interface IProps extends React.Props<App> {
  state: any;
  dispatch: Function;
}

// const history = syncHistory(browserHistory);
export default class App extends React.Component<IProps, void> {
    public render() {
      let state = store.getState();
      let dispatch = store.dispatch;
      switch (state.app.uiState) {
        case uiState.MAIN:
          return (
              <div>MAIN</div>
          );
        default: return <div></div>;
      }
    }
};
