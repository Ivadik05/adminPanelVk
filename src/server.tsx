import * as http from 'http';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext as RoutingContext } from 'react-router';
import * as fs from 'fs';
import { createPage, write, writeError, writeNotFound, redirect, getFileExtension } from './utils/server-utils';
import routes from './routes';
import { utils } from '../src/utils';

let PORT = process.env.PORT || 5000;

function renderApp(props, res) {
  let markup = renderToString(<RoutingContext {...props}/>);
  let html = createPage(markup);
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
        renderApp(renderProps, res);
      } else {
        writeNotFound(res);
      }
    });
  }

}).listen(PORT);
console.log(`listening on port ${PORT}`);
