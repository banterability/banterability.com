var FILES, fs, http, serveFile;

http = require('http');
fs = require('fs');

FILES = {
  '/': {
    type: 'text/html',
    path: 'publish/index.html'
  },
  '/favicon.ico': {
    type: 'image/x-icon',
    path: 'publish/favicon.ico'
  },
  '/style.css': {
    type: 'text/css',
    path: 'publish/style.css'
  }
};

serveFile = function(url, cb) {
  var file;
  if (file = FILES[url]) {
    return fs.readFile(file.path, function(err, data) {
      return cb(err, data, {
        'Content-Type': file.type
      });
    });
  } else {
    return cb(new Error('file not found'));
  }
};

http.createServer(function(req, res) {
  console.log('[Incoming] ', req.url)
  return serveFile(req.url, function(err, body, headers) {
    if (err) {
      console.log('[500] Error', {err: err});
      res.writeHead(500);
      return res.end();
    } else {
      console.log('[200] Serving file' + req.url);
      res.writeHead(200, headers);
      return res.end(body);
    }
  });
}).listen(5678);
