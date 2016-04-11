// polyfill webpack require.ensure
if (typeof require['ensure'] !== 'function') {
  require['ensure'] = (d, c) => c(require);
}

import App from '../ui/app';
import Main from '../ui/containers/main';

export default {
  path: '/',
  component: App,
  getChildRoutes(location, cb) {
    require['ensure']([], (require) => {
      cb(null, [ require('./aboutRoute') ]);
    });
  },
  indexRoute: {
    component: Main
  }
}
