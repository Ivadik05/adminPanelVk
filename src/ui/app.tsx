import * as React from 'react';
import { marketType } from '../io/types';
import { uiState } from '../constants';
import { Link } from 'react-router';
import store from '../store';
import {error} from 'util';

export interface IProps extends React.Props<App> {
  state: any;
  dispatch: Function;
}

// const history = syncHistory(browserHistory);
export default class App extends React.Component<IProps, void> {
    public render() {
      let state = store.getState();
      let dispatch = store.dispatch;
      console.error(state.market);
      return (
          <div>
            <div className='header'>
              <button>
                <Link to={`/welcome`}>to login</Link>
              </button>
            </div>
            <div className='detail'>
              {this.props.children}
            </div>
          </div>
      );
    }
};
