#!/usr/bin/env node


var http = require('http')
var opn = require('opn')
var rc = module.require('rc')
var argv = require('optimist').argv
var config = rc('hcat', {}, argv)

if (argv.usage) {
	console.log(require('./usage.js'))
	process.exit(0)
}

function handler(request, response) {
	var contentType = 'text/html'

	var stream = process.stdin

	response.setHeader('Content-Type', contentType)

	stream.pipe(response)

	response.on('finish', function() {
		process.exit(0)
	})
}

var server = http.createServer(handler)

server.on('listening', function() {
  opn('http://127.0.0.1:' + server.address().port)
})

server.listen(config.port || 0)
