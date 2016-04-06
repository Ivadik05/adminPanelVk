import * as React from 'react';
// import Panel from './containers/panel';
// import Login from './containers/login';
// import Preloader from './components/preloader';
// import { uiState } from '../constants';

export interface IProps extends React.Props<App> {
  state: any;
  dispatch: Function;
}

export default class App extends React.Component<IProps, void> {
    public render() {
      let { event } = this.props.state;
      return <div className='div'>{event.type}</div>;
    }
};
