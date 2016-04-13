import startServices from './app/start';
import * as React from 'react';
import { match, Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import { utils } from './utils';
import store from './store';

const history = syncHistoryWithStore(browserHistory, store);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

store.subscribe(() => {
  match(utils.tsReturnTypeFix({ routes, location }), () => {
    render(
        <Router routes={routes} history={history} />,
        document.getElementById('app')
    );
  });
});

startServices();

