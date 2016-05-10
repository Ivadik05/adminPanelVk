import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { connect } from 'react-redux';
import { marketType } from '../io/types';
import { uiState } from '../constants';
import { utils } from '../utils';
import { actionCreators } from './action-creators';
import * as Helmet from 'react-helmet';
import { routeConstants } from '../routes/index';

import Header from './components/header';
import Nav from './components/nav';
import Wrapper from './containers/wrapper';
import Footer from './components/footer';
import ShoppingCartBar from './components/shopping-cart-bar';

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

  public componentDidMount() {
    let tempStore = document.querySelector('#tempStore');
    if (tempStore) {
      tempStore.remove();
    }
  }

  public render() {
    let appStyles = {
      backgroundImage: `url(${this.props.state.app.bgPhoto})`
    };
    let { routing, market } = this.props.state;
    // let isShopCart = market.shoppingCart.productsSelected.length &&
    //     (this.props['location'].pathname &&
    //       this.props['location'].pathname.indexOf(routeConstants.SHOPPING_CART) === -1);
    let isShopCart = market.shoppingCart.productsSelected.length &&
        (this.props['location'].pathname &&
          this.props['location'].pathname !== routeConstants.SHOPPING_CART);
    return (
        <div className={styles.app} style={appStyles}>
          <Helmet
              htmlAttributes={{'lang': 'ru'}}
              titleTemplate={'Всё Взаимоcвязано - %s'}
              defaultTitle={'Всё Взаимоcвязано'}
              meta={[
                    {'name': 'theme-color', content: '#4B93B1'},
                    {'name': 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
                    {'name': 'description', 'content': 'Всё Взаимосвязано - вязание и рукоделие.'}
                ]}
          />
          <Header/>
          <Nav
            routing={routing}
            getAbout={this.getAbout}
          />
          <Wrapper>
            {this.props.children}
          </Wrapper>
          <Footer isShopCart={isShopCart}/>
          <ShoppingCartBar
              shoppingCart={market.shoppingCart}
              isShopCart={isShopCart}
          />
        </div>
    );
  }
}


const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(App);
