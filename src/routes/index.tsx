import * as React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'
import { utils } from '../utils';

import App from '../ui/app';
import About from '../ui/containers/about';

export default (
    <Route path='/' component={utils.tsReturnTypeFix(App)}>
      <IndexRoute component='INDEX'/>
      <Redirect from='*.*' to='/' />
      <Route path='/:login/:name'
             component={'loginName'} />
      <Route path='/login'
             component='login' />
      <Route path='/about'
             component={utils.tsReturnTypeFix(About)} />
      <Route path='*' component='noFound'/>
    </Route>
)
