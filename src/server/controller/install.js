const {checkConnection} = require('../model/mongo')
const {CODE} = require('../../utils/code.js')

module.exports.postcheckDB = (req,res) =>{
    switch(req.body.type){
        case 'mongodb':{
            checkConnection(`mongodb://${req.body.addr}/${req.body.name}`)
            .then(()=>res.send({code:CODE.OK}))
            .catch((err)=>res.send({code:CODE.ERROR,err:err}))
            break
        }
        default :{
            res.send({code:1})
        }
    }
}

module.exports.postsave = (req,res)=>{
    global.installed = true
    res.send({code:1})
}
