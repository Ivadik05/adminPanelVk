import * as React from 'react';
import { marketType } from '../io/types';
import { uiState } from '../constants';
import { Link } from 'react-router';
import Wrapper from './containers/wrapper';
import Footer from './components/footer';
import store from '../store';

export interface IProps extends React.Props<App> {
  state: any;
  dispatch: Function;
}

export default class App extends React.Component<IProps, void> {
    public render() {
      let state = store.getState();
      let dispatch = store.dispatch;
      return (
          <div>
            <Wrapper
                {...state} {...dispatch}
            />
            <Footer/>
          </div>
      );
    }
};
