const http = require('http')
const spawn = require('child_process').spawn
const opn = require('opn')
const defaultConfig = require('./config')
const { isString } = require('util')

/**
 *	@param {Stream|Buffer|String} data
 *	@param {object} config
 *	@param {number} config.port
 *	@param {string} config.hostname
 *	@param {string} config.contentType
 *	@param {boolean} config.serveOnce
 *
 *	@returns {object} server
 */
module.exports = function(data, config) {
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

	if (config.serveOnce === undefined) {
		config.serveOnce = defaultConfig.serveOnce
	} else {
		config.serveOnce = (config.serveOnce === 'true' || config.serveOnce === true || config.serveOnce === 1)
	}

	let server = http.createServer()
	server.once('request', (request, response) => {
		
		// Only serve one request
		if (config.serveOnce) {
			server.close()
		}

		response.setHeader('Content-Type', config.contentType)

		if (config.contentSecurityPolicy) {
			response.setHeader('Content-Security-Policy', config.contentSecurityPolicy)
		}

		if (Buffer.isBuffer(data) || isString(data)) {
			response.end(data)
		} else {
			// ass-u-me it's a stream 
			data.pipe(response)
		}
	})

	server.on('listening', () => {
		let url = 'http://' + config.hostname + ':' + server.address().port

		if (!process.env.BROWSER) {
			console.error('The environment variable $BROWSER is not set. Falling back to default opening mechanism.')
			opn('http://' + config.hostname + ':' + server.address().port, { wait: false })
		} else {
			spawn(process.env.BROWSER, [url], { detached: true })
		}
	})

	server.listen(config.port, config.hostname)

	return server
}