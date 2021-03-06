//development node version 7.5.0
const path = require('path')
const express = require('express')
const app = express()
const log = require('./server/log.js')
const i18n = require('i18n')
const bodyParser = require('body-parser')

global.appRoot = path.resolve(__dirname)

const setupRoutes = require('./server/routes.js')
const setupSession =require('./server/session.js')
const setupPolicy = require('./server/policy.js')



app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug')

i18n.configure({
	locales:['en', 'zh'],
	directory: __dirname + '/locales',
	defaultLocale: 'zh',
	queryParameter: 'lang',
	autoReload:app.get('env') !== 'production',
	api: {
		'__': '_T'
	}
})

app.use(i18n.init)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// order is important
setupSession(app)
setupPolicy(app)
setupRoutes(app)

var server = app.listen(3000, function () {
	var host = server.address().address
	var port = server.address().port
	log.info(`host:${host}\tport:${port}\tenv:${app.get('env')}`)
})
