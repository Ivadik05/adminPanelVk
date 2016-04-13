import * as React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import { utils } from '../utils';

import App from '../ui/app';

// <IndexRoute component={utils.tsReturnTypeFix(Main)}/>
// <Route path='*' component='noFound'/>
export default (
    <Route path='/' component='noFound'>
      <Redirect from='*' to='/404' />
      <Route path='/404' component='noFound'/>
    </Route>
)
