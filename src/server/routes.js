const router = require('express').Router()

const userInfo = require('../test/datas/user.json')

router.get('/',(req,res)=>{
	res.locals.user = userInfo
	res.render(`theme/${userInfo.theme || 'default'}`)
})

router.get('/admin/login',(req,res)=>{
	res.render('login')
})


module.exports = router
