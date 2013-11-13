http = require 'http'
fs = require 'fs'



http.createServer((req, res) ->
  console.log "serving #{req.url}"
  switch req.url
    when "/"
      res.writeHead 200, 'Content-Type': 'text/html'
      serveFile 'index.html', res
    when "/index.html"
      res.writeHead 200, 'Content-Type': 'text/html'
      serveFile 'index.html', res
    when "/favicon.ico"
      res.writeHead 200
      serveFile 'favicon.ico', res
    when "/app.css"
      res.writeHead 200, 'Content-Type': 'text/css'
      serveFile 'publish/app.css', res
    else
      res.writeHead 404
      res.end()
).listen(3456, '127.0.0.1')

serveFile = (filename, res) ->
  console.log "serving contents of #{filename}..."
  fs.readFile filename, (err, data) ->
    throw err if err
    res.end data
