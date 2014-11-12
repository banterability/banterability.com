fs = require 'fs'
http = require 'http'

knownFiles = JSON.parse fs.readFileSync "#{__dirname}/files.json"

server = http.createServer (req, res) ->
  if file = knownFiles[req.url]
    res.writeHead 200, 'Content-Type': file.type
    fs.createReadStream("#{__dirname}/../#{file.path}").pipe(res)
  else
    res.writeHead(404)
    res.end()

server.listen 5678, ->
  console.log 'up on 5678'
