import * as React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect, Router } from 'react-router';
import { utils } from '../utils';

import App from '../ui/app';
import Main from '../ui/containers/wrapper/main';
import About from '../ui/containers/wrapper/about';
import Market from '../ui/containers/wrapper/market';
import Contacts from '../ui/containers/wrapper/contacts';
import Delivery from '../ui/containers/wrapper/delivery';
import NoFound from '../ui/containers/noFound';
import ShoppingCart from '../ui/containers/wrapper/shopping-cart';
import ShoppingOrder from '../ui/containers/wrapper/shopping-cart/shopping-order';

export const routeConstants = {
  INDEX: '/',
  ABOUT: '/about',
  MARKET: '/market',
  CONTACTS: '/contacts',
  DELIVERY: '/delivery',
  SHOPPING_CART: '/cart',
  SHOPPING_CART_ORDER: 'order',
  NO_FOUND: '/404'
};

export default (
    <Router>
        <Route path={routeConstants.INDEX} component={App}>
          <IndexRoute component={Main}/>
          <Route path={routeConstants.ABOUT} component={About} />
          <Redirect from={`${routeConstants.ABOUT}.*`} to={routeConstants.ABOUT} />
          <Route path={routeConstants.MARKET} component={Market} />
          <Route path= {`${routeConstants.MARKET}/:marketId`} component={Market} />
          <Redirect from={`${routeConstants.MARKET}.*`} to={routeConstants.MARKET} />
          <Route path={routeConstants.CONTACTS} component={Contacts} />
          <Redirect from={`${routeConstants.CONTACTS}.*`} to={routeConstants.CONTACTS} />
          <Route path={routeConstants.DELIVERY} component={Delivery} />
          <Redirect from={`${routeConstants.DELIVERY}.*`} to={routeConstants.DELIVERY} />
          <Route path={routeConstants.SHOPPING_CART} component={ShoppingCart} >
            <Route path={routeConstants.SHOPPING_CART_ORDER} component={ShoppingOrder} />
          </Route>
          <Redirect from={`${routeConstants.SHOPPING_CART}.*`} to={routeConstants.SHOPPING_CART} />
          <Route path={routeConstants.NO_FOUND} component={NoFound} />
        </Route>
        <Redirect from={`*`} to={routeConstants.NO_FOUND} />
    </Router>
)
