#!/usr/bin/env node

var http = require('http')
var opn = require('opn')
var rc = module.require('rc')
var config = rc('hcat', {})

if (config.usage) {
	console.log(require('./usage.js'))
	process.exit(1)
}

function handler(request, response) {
	// Only accept one request
	this.close();

	var contentType = 'text/html'

	var stream = process.stdin

	response.setHeader('Content-Type', contentType)

	stream.pipe(response)
}

var server = http.createServer();
server.once('request', handler);

server.on('listening', function() {
	opn('http://localhost:' + server.address().port)
})

server.listen(config.port || 0, 'localhost')
