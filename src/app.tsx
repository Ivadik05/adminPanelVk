import startServices from './app/start';
import * as React from 'react';
import { Provider } from 'react-redux';
import { match, Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import { utils } from './utils';
import store from './store';
import * as ga from 'react-ga';
const history = syncHistoryWithStore(browserHistory, store);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;


if (process.env.NODE_ENV === 'production') {
  ga.initialize('UA-76791325-1');
}

// 36942255

let sendLocation = () => {
  ga.pageview(window.location.pathname);
};


match(utils.tsReturnTypeFix({ routes, location }), () => {
  render(
      <Provider store={store}>
        <Router routes={routes} history={history} onUpdate={sendLocation} />
      </Provider>,
      document.getElementById('app')
  );
});

startServices();

