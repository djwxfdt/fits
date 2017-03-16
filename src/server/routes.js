const router = require('express').Router()

const routes = {
	'/':require('./controller/home.js'),
	'/admin/login':require('./controller/admin.js').Login
}


for(let [k,v] of Object.entries(routes)){
	router.get(k,(req,res,next)=>v(req,res,next))
}


module.exports = router
