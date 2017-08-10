var http = require('http')
var spawn = require('child_process').spawn
var opn = require('opn')
var defaultConfig = require('./config')

/**
 *
 *
 */
module.exports = function(stream, config) {
	config = config || {}

	if (config.port === undefined) {
		config.port = defaultConfig.port
	}

	if (config.hostname === undefined) {
		config.hostname = defaultConfig.hostname
	}

	if (config.contentType === undefined) {
		config.contentType = defaultConfig.contentType
	}

	function handler(request, response) {
		// Only accept one request
		this.close()

		response.setHeader('Content-Type', config.contentType)

		stream.pipe(response)
	}

	var server = http.createServer()
	server.once('request', handler)

	server.on('listening', function() {
		var url = 'http://' + config.hostname + ':' + server.address().port

		if (!process.env.BROWSER) {
			console.error('The environment variable $BROWSER is not set. Falling back to default opening mechanism.')
			opn('http://' + config.hostname + ':' + server.address().port)
		} else {
			spawn(process.env.BROWSER, [url])
		}
	})

	server.listen(config.port, config.hostname)
}