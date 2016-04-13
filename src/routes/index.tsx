import * as React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import { utils } from '../utils';

import App from '../ui/app';
import Main from '../ui/containers/wrapper/main';
import About from '../ui/containers/wrapper/about';
import Market from '../ui/containers/wrapper/market';

export default (
    <Route path='/' component={utils.tsReturnTypeFix(App)}>
      <IndexRoute component={utils.tsReturnTypeFix(Main)}/>
      <Route path='/about' component={utils.tsReturnTypeFix(About)} />
      <Route path='/market' component={utils.tsReturnTypeFix(Market)} />
      <Route path='*' component='noFound'/>
      <Redirect from='*.*' to='/' />
    </Route>
)
