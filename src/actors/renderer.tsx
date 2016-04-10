import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from '../ui/app';
import Root from '../ui/root'
import { utils } from '../utils';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from '../store';

const APP_NODE = document.getElementById('app');
const history = syncHistoryWithStore(browserHistory, store);

let render = utils.debounce((state, dispatch) => {
  ReactDom.render(<Root store={store} history={history} />, APP_NODE);
}, 80);

export default function renderer(state , dispatch) {
  let {app} = state;
  if (!app.started) {
    return false;
  }
  render(state, dispatch);
};
