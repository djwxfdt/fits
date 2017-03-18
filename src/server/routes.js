const router = require('express').Router()
let adminController = require('./controller/admin.js')

const gets = {
	'/':require('./controller/home.js'),
	'/admin/login':adminController.Login,
	'/admin/install':adminController.install
}

const posts = {
	'/admin/login':adminController.postLogin
}


for(let [k,v] of Object.entries(gets)){
	router.get(k,(req,res,next)=>v(req,res,next))
}

for(let [k,v] of Object.entries(posts)){
	router.post(k,(req,res,next)=>v(req,res,next))
}


module.exports = app => {
	app.use(router)
}
