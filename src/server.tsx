import * as http from 'http';
import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import reducers from './ui/reducers';
import { match, RouterContext as RoutingContext } from 'react-router';
import * as Helmet from 'react-helmet';
import * as fs from 'fs';
import { createPage, write, writeError, writeNotFound, redirect, getFileExtension } from './utils/server-utils';
import routes from './routes';
import { utils } from '../src/utils';
import * as url from 'url';

import { NodeSender, ISender } from './app/sender';

let HOST = process.env.HOST || '127.0.0.1';
let PORT = process.env.PORT || 5000;

function renderApp(props, res, store) {
  let markup = renderToString(
      <Provider store={store}>
        <RoutingContext {...props}/>
      </Provider>
  );
  let head = Helmet.rewind();
  let html = createPage(markup, store.getState(), head);
  write(html, 'text/html', res);
}

function parseUrl(urlString) {
  if (urlString.indexOf('//') === 0) {
    return url.parse(urlString, true, true);
  } else {
    return url.parse(urlString, true, false);
  }
}

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    write('haha', 'text/plain', res);
  }
  // else if (/dist/.test(req.url)) {
  //   let extension = getFileExtension(req.url);
  //   switch (extension) {
  //     case 'js':
  //       fs.readFile(`.${req.url}`, (err, data) => {
  //         write(data, 'text/javascript', res);
  //       });
  //     break;
  //     case 'css':
  //       fs.readFile(`.${req.url}`, (err, data) => {
  //         write(data, 'text/css', res);
  //       });
  //     break;
  //     default: break;
  //   }
  // }
  else if (parseUrl(req.url)['pathname'] === '/away.php') {
    res.writeHead(302, {
      'Location': parseUrl(req.url)['query']['to']
    });
    res.end();
  } else {
    match(utils.tsReturnTypeFix({ routes, location: req.url }), (error, redirectLocation, renderProps) => {
      if (error) {
        writeError('ERROR!', res);
      } else if (redirectLocation) {
        redirect(redirectLocation, res);
      } else if (renderProps) {
        let store = createStore(reducers, {});
        let sender: ISender = new NodeSender(store);
        sender.fetchAllData(() => {
          renderApp(renderProps, res, store);
        });
      } else {
        match(utils.tsReturnTypeFix({ routes, location: '/404' }), (error, redirectLocation, renderProps) => {
          if (renderProps) {
            let store = createStore(reducers, {});
            renderApp(renderProps, res, store);
            writeNotFound(res);
          }
        });
      }
    });
  }

}).listen(PORT, HOST);
console.log(`listening on host ${HOST}:${PORT}`);


// "query-string": "registry:dt/query-string#3.0.0+20160331065456",
// "react-redux": "registry:dt/react-redux#4.4.0+20160406115600",
//     "react-router": "registry:dt/react-router#2.0.0+20160330124659",
//     "react-router-redux": "registry:dt/react-router-redux#4.0.0+20160316155526",
//     "react-router/history": "registry:dt/react-router/history#2.0.0+20160316155526",
