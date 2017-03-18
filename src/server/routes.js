const router = require('express').Router()

const gets = {
	'/':require('./controller/home.js'),
	'/admin/login':require('./controller/admin.js').Login
}

const posts = {
	'/admin/login':require('./controller/admin.js').postLogin
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
