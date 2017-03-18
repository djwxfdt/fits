const auth = require('../../test/datas/auth.json')
const {encryptPassword} = require('../../utils/encrypt.js')
const log = require('../log.js')
const fs = require('fs')
const path = require('path')

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

module.exports.install  = (req,res)=>{
    let flag = false
    fs.exists(path.join(global.appRoot,'install.lock'),exists=>flag = exists)
    if(!flag){
        res.render('install')
    }
    else{
        res.redirect('/admin/home')
    }
}
