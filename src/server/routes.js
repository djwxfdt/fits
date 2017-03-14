const router = require('express').Router()

const userInfo = require('../test/datas/user.json')

router.get('/',(req,res)=>{
	res.locals.user = userInfo
	res.render(`theme/${userInfo.theme || 'default'}`)
})


module.exports = router
