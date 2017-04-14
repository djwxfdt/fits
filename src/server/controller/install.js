const {checkConnection} = require('../model/mongo')
const {CODE} = require('../../utils/code.js')
const path = require('path')
const {encryptPassword} = require('../../utils/encrypt.js')
const user = require('../service/user.js')


module.exports.postcheckDB = (req,res) =>{
    switch(req.body.type){
        case 'mongodb':{
            checkConnection(`mongodb://${req.body.addr}/${req.body.name}`)
            .then(()=>res.send({code:CODE.OK}))
            .catch((err)=>res.send({code:CODE.ERROR,err:err}))
            break
        }
        default :{
            res.send({code:CODE.OK})
        }
    }
}

module.exports.postsave = (req,res)=>{
    let dbSetting = {}
    dbSetting.type = req.body.type
    switch(req.body.type){
        case 'mongodb':{
            dbSetting.url = `mongodb://${req.body.addr}/${req.body.name}`
            break
        }
        case 'sqlite':{
            dbSetting.filename = path.join(global.appRoot,'data','sqlite.db')
            break
        }
        default:{
            res.send({code:CODE.ERROR})
        }
    }
    user.save('db',dbSetting)
    user.save('user',{
        account:req.body.account,
        password:encryptPassword(req.body.password),
        email:req.body.email,
        sitename:req.body.sitename,
    })

    global.installed = true
    res.send({code:CODE.OK})
}
