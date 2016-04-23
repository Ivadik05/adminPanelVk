import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { connect } from 'react-redux';
import { marketType } from '../io/types';
import { uiState } from '../constants';
import { utils } from '../utils';
import { actionCreators } from './action-creators';

import Header from './components/header';
import Nav from './components/nav';
import Wrapper from './containers/wrapper';
import Footer from './components/footer';
let styles = require('./style.css');

interface IProps extends React.Props<App> {
  state: any;
  dispatch: IDispatch;
}

class App extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
    this.getAbout = this.getAbout.bind(this);
  }

  public getAbout() {
    this.props.dispatch(actionCreators.getAbout());
  }

  public render() {
    return (
        <div className={styles.app}>
          <Helmet
              meta={[
                    {'name': 'theme-color', content: '#4B93B1'}
                ]}
              onChangeClientState={(newState) => console.log(newState)}
          />
          <Header/>
          <Nav
            routing={this.props.state.routing}
            getAbout={this.getAbout}
          />
          <Wrapper>
            {this.props.children}
          </Wrapper>
          <Footer/>
        </div>
    );
  }
}


const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(App);
