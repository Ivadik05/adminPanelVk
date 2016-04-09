import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from '../ui/app';
import { utils } from '../utils';

const APP_NODE = document.getElementById('app');

// Add render debounce to prevent to much blink!
// Maybe need throttle or some other stuff ¯\_(ツ)_/¯
let render = utils.debounce((state, dispatch) => {
  ReactDom.render(<App state={state} dispatch={dispatch}/>, APP_NODE);
}, 80);
let __DEV__ = true;
export default function renderer(state , dispatch) {
  let {app} = state;
  if (!app.started) {
    return false;
  }
  if (__DEV__) {
    let renderInstance = render(state, dispatch);
    if (module['hot']) {
      require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function() {
          return [renderInstance];
        }
      });
    }
  } else {
    render(state, dispatch);
  }
};
