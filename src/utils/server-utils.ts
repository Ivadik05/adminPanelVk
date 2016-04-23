import * as zlib from 'zlib';

export function writeError(msg, res) {
  res.writeHead(500, { 'Content-Type': 'text/html' });
  res.write('ERROR!');
  res.end();
}

export function redirect(location, res) {
  res.writeHead(302, { 'Location': location.pathname });
  res.end();
}

export function writeNotFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('Not Found');
  res.end();
}

export function write(string, type, res) {
  zlib.gzip(string, (err, result) => {
    res.writeHead(200, {
      'Content-Length': result.length,
      'Content-Type': type,
      'Content-Encoding': 'gzip'
    });
    res.write(result);
    res.end();
  });
}

export function getFileExtension(link: string) {
  let dotIndex = link.lastIndexOf('.');
  if (dotIndex === -1) {
    return '';
  }
  return link.substr(dotIndex + 1);
}

export function createPage(html, initialState) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <meta name="theme-color" content="#4B93B1">
      <meta name="google-site-verification" content="Y6Z6xpAQ0jRjRQWaf8N11oPxF0Yj4xKkMIM6cFSg5e0" />
      <title>Всё взаимосвязано</title>
      <link rel='stylesheet' href='/dist/app.css'> 
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/dist/app.js"></script>
    </body>
  </html>
  `;
}
