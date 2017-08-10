#!/usr/bin/env node

var hcat = require('./index')
var config = require('./config')

if (config.usage) {
	console.log(require('./usage.js'))
	process.exit(1)
}

hcat(process.stdin, config)