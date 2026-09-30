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
	const sockets = new Set()

	if (config.serveOnce) {
		server.on('connection', (socket) => {
			sockets.add(socket)
			socket.once('close', () => sockets.delete(socket))
		})
	}

	server[config.serveOnce ? 'once' : 'on']('request', (request, response) => {

		// Only serve one request
		if (config.serveOnce) {
			server.close()
			response.once('finish', () => closeSockets(sockets))
		}

		response.setHeader('Content-Type', config.contentType)

		if (config.contentSecurityPolicy) {
			response.setHeader('Content-Security-Policy', config.contentSecurityPolicy)
		}

		if (Buffer.isBuffer(data) || typeof data === 'string') {
			response.end(data)
		} else {
			// ass-u-me it's a stream
			// without a listener a source error crashes the process, and pipe() never ends the response on error
			data.once('error', (err) => {
				console.error(err)
				data.unpipe(response)
				response.end()
			})
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

// keep-alive sockets (and extra requests like /favicon.ico) would keep the server
// alive after serving once. end() lets the response drain before closing, destroy()
// is a fallback for clients that never close their side
function closeSockets(sockets) {
	for (const socket of sockets) {
		socket.end()
	}

	setTimeout(() => {
		for (const socket of sockets) {
			socket.destroy()
		}
	}, 1000).unref()
}