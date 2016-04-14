import * as http from 'http';
import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import reducers from './ui/reducers';
import { match, RouterContext as RoutingContext } from 'react-router';
import * as fs from 'fs';
import { createPage, write, writeError, writeNotFound, redirect, getFileExtension } from './utils/server-utils';
import routes from './routes';
import { utils } from '../src/utils';

let PORT = process.env.PORT || 5000;

function renderApp(props, res) {
  let store = createStore(reducers, {});
  let markup = renderToString(
      <Provider store={store}>
        <RoutingContext {...props}/>
      </Provider>
  );
  let html = createPage(markup, store.getState());
  write(html, 'text/html', res);
}

http.createServer((req, res) => {

  if (req.url === '/favicon.ico') {
    write('haha', 'text/plain', res);
  } else if (/dist/.test(req.url)) {
    let extension = getFileExtension(req.url);
    switch (extension) {
      case 'js':
        fs.readFile(`.${req.url}`, (err, data) => {
          write(data, 'text/javascript', res);
        });
      break;
      case 'css':
        fs.readFile(`.${req.url}`, (err, data) => {
          write(data, 'text/css', res);
        });
      break;
      default: break;
    }
  } else {
    match(utils.tsReturnTypeFix({ routes, location: req.url }), (error, redirectLocation, renderProps) => {
      if (error) {
        writeError('ERROR!', res);
      } else if (redirectLocation) {
        redirect(redirectLocation, res);
      } else if (renderProps) {
        let options = {
          host: 'ecoprint43.ru',
          path: '/connector.php?method=market.get&owner_id=-61279456&extended=1'
        };
        let transmitter: ITransmitter = new WebRequest();
        this.io = new Io({server: settings.SERVER}, transmitter);

        requestData(options, (result) => {
          renderApp(renderProps, res);
        });
      } else {
        writeNotFound(res);
      }
    });
  }

}).listen(PORT);
console.log(`listening on port ${PORT}`);
