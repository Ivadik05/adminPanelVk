import * as React from 'react';
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import routes from './routes'


export interface IProps extends React.Props<Root> {
  store: any;
  history: any;
}

export default class Root extends React.Component<IProps, void> {
    public render() {
      let { store, history } = this.props;
      return (
          <Provider store={store}>
            <div>
              <Router history={history} routes={routes} />
            </div>
          </Provider>
      );
    }
};
