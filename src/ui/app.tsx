import * as React from 'react';
import { marketType } from '../io/types';
import { uiState } from '../constants';
import Header from './components/header';
import Nav from './components/nav';
import Wrapper from './containers/wrapper';
import Footer from './components/footer';

import startServices from '../app/start';
let styles = require('./style.css');

export interface IProps extends React.Props<App> {
  state: any;
  dispatch: Function;
}

export default class App extends React.Component<IProps, void> {
  constructor(props) {
    super(props);
  }

    public render() {
      
      return (
          <div className={styles.app}>
            <Header/>
            <Nav/>
            <Wrapper>
              {this.props.children}
            </Wrapper>
            <Footer/>
          </div>
      );
    }
};
