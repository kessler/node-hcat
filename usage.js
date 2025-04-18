var table = require('text-table');

module.exports = table([
['Options:\n'],
['--port', 			'set a port for this hcat execution\n', 					'defaults to 0 (random port)'],
['--hostname', 		'set the hostname for this hcat execution\n', 			'defaults to localhost'],
['--contentType',	'set the content type header for this hcat execution\n', 	'defaults to text/html'],
['--contentSecurityPolicy',	'set the content security policy header for this hcat execution\n', 	'will not be added if not specified'],
['--serveOnce',		'instruct the server to serve only one request\n', 		'true'],
]);
