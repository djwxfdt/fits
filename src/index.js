//development node version 6.2.2

const app = require('express')()
const log = require('./server/log.js')

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port
	log.info(`host:${host}\tport${port}`)
})
