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

import { settings } from './settings';
import { Io  } from './io';
import { NodeTransmitter } from './io/transmitter';
import { ITransmitter, IResponse } from './io/interfaces';
import { IAbstractRequest } from './io/interfaces';
import { GetMarket } from './io/request/get-market';
import { GetAbout } from './io/request/get-about';
import { events } from './events';

let HOST = process.env.HOST || '127.0.0.1';
let PORT = process.env.PORT || 5000;

function getApiData(callback) {
  let requestSettings = {
    host: settings.HOST,
    path: settings.PATH
  };
  let transmitter: ITransmitter = new NodeTransmitter(requestSettings);
  let io = new Io(requestSettings, transmitter);
  let requests = [new GetMarket('-61279456', '', true), new GetAbout('61279456', '33502073')];
  io.promiseAll(requests, (resultApi: Array<IResponse>) => {
    callback(resultApi);
  });
}

// function updateStore(resultApi: IResponse) {
//   let store = createStore(reducers, {});
//   store.dispatch({
//     type: `save-${resultApi.getName()}`,
//     payload: resultApi.getData()
//   });
//   return store;
// }

function renderApp(props, res) {
  let store = createStore(reducers, {});
  // store.dispatch({
  //   type: `save-${resultApi.getName()}`,
  //   payload: resultApi.getData()
  // });
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
        let requestSettings = {
          host: settings.HOST,
          path: settings.PATH
        };
        let transmitter: ITransmitter = new NodeTransmitter(requestSettings);
        let io = new Io(requestSettings, transmitter);
        // io.send(new GetMarket('-61279456', '', true), (resultApi: IResponse) => {
        //   renderApp(renderProps, res, resultApi);
        // });
        renderApp(renderProps, res);
      } else {
        writeNotFound(res);
      }
    });
  }

}).listen(PORT, HOST);
console.log(`listening on host ${HOST}:${PORT}`);
