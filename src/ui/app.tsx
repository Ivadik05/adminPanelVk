import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { connect } from 'react-redux';
import { marketType } from '../io/types';
import { uiState } from '../constants';
import { utils } from '../utils';
import { actionCreators } from './action-creators';
import * as Helmet from 'react-helmet';

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
    // let bgImage = [
    //   'http://cs630620.vk.me/v630620541/28050/BU8j3o3JI-E.jpg',
    //   'http://cs631728.vk.me/v631728541/23f33/5w96LpKezSI.jpg',
    //   'http://cs631728.vk.me/v631728541/23f05/5ItfeDv7Lt4.jpg'
    // ];
    // let appStyles = {
    //   backgroundImage: `url(${bgImage[utils.getRandomInt(0, 2)]})`
    // };
    return (
        <div className={styles.app}>
          <Helmet
              htmlAttributes={{'lang': 'ru', 'amp': undefined}}
              titleTemplate={'Всё ВзаимоСвязано - %s'}
              defaultTitle={'Всё ВзаимоСвязано'}
              meta={[
                    {'name': 'theme-color', content: '#4B93B1'},
                    {'name': 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
                    {'name': 'description', 'content': 'Всё Взаимосвязано'}
                ]}
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
