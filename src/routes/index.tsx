import * as React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect, Router } from 'react-router';
import { utils } from '../utils';

import App from '../ui/app';
import Main from '../ui/containers/wrapper/main';
import About from '../ui/containers/wrapper/about';
import Market from '../ui/containers/wrapper/market';
import Contacts from '../ui/containers/wrapper/contacts';
import NoFound from '../ui/containers/noFound';

export const routeConstants = {
  INDEX: '/',
  ABOUT: '/about',
  MARKET: '/market',
  CONTACTS: '/contacts'
};

export default (
    <Router>
          <Route path={routeConstants.INDEX} component={App}>
            <IndexRoute component={Main}/>
            <Route path={routeConstants.ABOUT} component={About} />
            <Redirect from={`${routeConstants.ABOUT}.*`} to={routeConstants.ABOUT} />
            <Route path={routeConstants.MARKET} component={Market} />
            <Redirect from={`${routeConstants.MARKET}.*`} to={routeConstants.MARKET} />
            <Route path={routeConstants.CONTACTS} component={Contacts} />
            <Redirect from={`${routeConstants.CONTACTS}.*`} to={routeConstants.CONTACTS} />
          </Route>
          <Route path='*' component={NoFound} />
    </Router>
)
