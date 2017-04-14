var mongoose = require('mongoose')
const log = require('../../log.js')

module.exports.checkConnection = str =>{
    return new Promise((rl,rj)=>{
        try{
            let conn = mongoose.createConnection(str)
            conn.once('open',()=>{
                conn.db.close()
                log.info(str,'connect successful!')
                rl()
            })
            conn.on('error',(err)=>{
                conn.db.close()
                rj(JSON.stringify(err))
            })
        }
        catch(err){
            rj(err)
        }
    })
}
