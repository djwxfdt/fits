const auth = require('../../test/datas/auth.json')
const {encryptPassword} = require('../../utils/encrypt.js')
const log = require('../log.js')

module.exports.Login = (req,res)=>{
    res.render('login')
}

module.exports.postLogin = (req,res)=>{
    let account = req.body.username
    let password = encryptPassword(req.body.password)
    if(account == auth.account && password == auth.password){
        log.info('login success!')
        req.session.user = {token:1}
        res.send({code:0})
    }
    else{
        log.warn('login error!')
        res.send({code:80001})
    }
}
