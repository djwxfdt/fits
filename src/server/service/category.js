const db = require('./db.js')
const Shemas = require('../model/mongo/shemas.js')
const log = require('../log.js')

class Category{
    static save(data){
        if(db.getType() == 'mongodb'){
            let conn = db.createConnection()
            let BlogCategory = conn.model('category',Shemas.BlogCategory)
            let category = new BlogCategory()
            category.title = data.title
            return new Promise((resolve)=>{
                 category.save((err,data)=>{
                     resolve(data)
                 })
            })
        }
    }


    static all(){
        if(db.getType() == 'mongodb'){
            let conn = db.createConnection()
            let BlogCategory = conn.model('category',Shemas.BlogCategory)

            return new Promise((resolve)=>{
                try{
                    BlogCategory.find({_id:{$exists:true} },null,(err,docs)=>{
                        resolve(docs)
                    })
                }
                catch(err){
                    log.error(err)
                    resolve([])
                }

            })
        }
        else{
            return new Promise((resolve)=>resolve([]))
        }
    }

    static delete(ids){
        if(db.getType() == 'mongodb'){
            let conn = db.createConnection()
            let BlogCategory = conn.model('category',Shemas.BlogCategory)
            let prs = ids.map(id=>new Promise((resolve)=>{
                BlogCategory.remove({_id:id},(err)=>{
                    log.error(err)
                    resolve()
                })
            }))
            return Promise.all(prs)
        }
    }
}

module.exports = Category
