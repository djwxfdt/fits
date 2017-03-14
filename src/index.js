//development node version 6.2.2
var routers = require('./server/routes.js')


const express = require('express')
const app = express()
const log = require('./server/log.js')

app.use(express.static('public'))
app.set('view engine', 'pug')
app.use('/',routers)

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port
	log.info(`host:${host}\tport${port}`)
})
