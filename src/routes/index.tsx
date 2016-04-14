import * as React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect, Router } from 'react-router';
import { utils } from '../utils';

import App from '../ui/app';
import Main from '../ui/containers/wrapper/main';
import About from '../ui/containers/wrapper/about';
import Market from '../ui/containers/wrapper/market';
import Contacts from '../ui/containers/wrapper/contacts';
import NoFound from '../ui/containers/noFound';

export default (
    <Router>
          <Route path='/' component={utils.tsReturnTypeFix(App)}>
            <IndexRoute component={utils.tsReturnTypeFix(Main)}/>
            <Route path='/about' component={utils.tsReturnTypeFix(About)} />
            <Redirect from='/about.*' to='/about' />
            <Route path='/market' component={utils.tsReturnTypeFix(Market)} />
            <Redirect from='/market.*' to='/market' />
            <Route path='/contacts' component={utils.tsReturnTypeFix(Contacts)} />
            <Redirect from='/contacts.*' to='/contacts' />
          </Route>
          <Route path='*' component={utils.tsReturnTypeFix(NoFound)} />
    </Router>
)
