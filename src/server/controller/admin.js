const auth = require('../../test/datas/auth.json')
const {encryptPassword} = require('../../utils/encrypt.js')
const log = require('../log.js')
const {CODE} = require('../../utils/code.js')



module.exports.login = (req,res)=>{
    res.render('login')
}

module.exports.postlogin = (req,res)=>{
    let account = req.body.username
    let password = encryptPassword(req.body.password)
    if(account == auth.account && password == auth.password){
        log.info('login success!')
        req.session.user = {token:1}
        res.send({code:CODE.OK})
    }
    else{
        log.warn('login error!')
        res.send({code:CODE.ERROR_LOGIN})
    }
}

module.exports.home = (req,res)=>{
    res.render('admin/home')
}
