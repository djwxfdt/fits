const db = require('./db.js')
const Shemas = require('../model/mongo/shemas.js')
const log = require('../log.js')

class Post{
    static save(data){
        if(db.getType() == 'mongodb'){
            let conn = db.createConnection()
            let BlogPost = conn.model('post',Shemas.BlogPost)
            let post = new BlogPost()
            post.title = data.title
            post.body = data.body
            post.date = new Date().getTime()
            post.save()
        }
    }

    static update({id,article,title}){
        if(db.getType() == 'mongodb'){
            let conn = db.createConnection()
            let BlogPost = conn.model('post',Shemas.BlogPost)
            return BlogPost.findById(id,(err,doc)=>{
                if(article){
                    doc.body = article
                }
                if(title){
                    doc.title = title
                }
                doc.save()
            })
        }
    }

    static all(){
        if(db.getType() == 'mongodb'){
            let conn = db.createConnection()
            let BlogPost = conn.model('post',Shemas.BlogPost)

            return new Promise((resolve)=>{
                try{
                    BlogPost.find({ deleted: { $ne: true },_id:{$exists:true} },null,{sort: '-date'},(err,docs)=>{
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

    static get(id){
        if(db.getType() == 'mongodb'){
            let conn = db.createConnection()
            let BlogPost = conn.model('post',Shemas.BlogPost)
            return BlogPost.findOne({_id:id})
        }
    }

    static delete(ids){
        if(db.getType() == 'mongodb'){
            let conn = db.createConnection()
            let BlogPost = conn.model('post',Shemas.BlogPost)
            let prs = ids.map(id=>new Promise((resolve)=>{
                BlogPost.findById(id,(err,doc)=>{
                    if(!err && doc){
                        doc.deleted = true
                        doc.save()
                    }
                    resolve()
                })
            }))

            return Promise.all(prs)
        }
    }
}

module.exports = Post
