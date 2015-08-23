#!/usr/bin/env node


var http = require('http')
var opn = require('opn')
var rc = module.require('rc')
var argv = require('optimist').argv
var config = rc('hcat', {}, argv)

if (argv.usage) {
	console.log(require('./usage.js'))
	process.exit(1)
}

function handler(request, response) {
  // Only accept one request
  server.close();

	var contentType = 'text/html'

	var stream = process.stdin

	response.setHeader('Content-Type', contentType)

	stream.pipe(response)
}

var server = http.createServer(handler)

server.on('listening', function() {
  opn('http://localhost:' + server.address().port)
})

server.listen(config.port || 0, 'localhost')
