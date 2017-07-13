const router = require('express').Router()
const controllers = require('./controller/')
const path = require('path')
const _ = require('lodash')

const customeRules = {
	'/details/:id$':'detail.index'
}

module.exports = app => {
	app.get('/',(req,res,next)=>{
		res.redirect('/home')
	})

	_.each(customeRules,(v,k)=>{
		app.get(k,(req,res,next)=>{
			let tmp = _.split(v,'.',2)
			require(`./controller/${tmp[0]}`)[tmp[1]](req,res,next)
		})
	})

	controllers.map(item=>{
		let mod = require(path.join(path.resolve(__dirname),'./controller',item + '.js'))

		for(let [k,v] of Object.entries(mod)){
			if(k.indexOf('post') == 0){
				router.post(`/${item}/${k.replace('post','')}`,v)
			}
			else{
				router.get('index' == k?`/${item}`:`/${item}/${k}`,v)
			}
		}
	})

	app.use(router)
}
