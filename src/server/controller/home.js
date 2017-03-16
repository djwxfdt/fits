const userInfo = require('../../test/datas/user.json')


module.exports = (req,res)=>{
	res.locals.user = userInfo
	res.render(`theme/${userInfo.theme || 'default'}`)
}
