//development node version 7.5.0
var routers = require('./server/routes.js')

const express = require('express')
const app = express()
const log = require('./server/log.js')
const i18n = require('i18n')

app.use(express.static('public'))
app.set('view engine', 'pug')

i18n.configure({
	locales:['en', 'zh'],
	directory: __dirname + '/locales',
	defaultLocale: 'zh',
	queryParameter: 'lang',
	autoReload:process.env.NODE_ENV !== 'production',
	api: {
		'__': '_T'
	}
})

app.use(i18n.init)
app.use('/',routers)

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port
	log.info(`host:${host}\tport${port}`)
})
