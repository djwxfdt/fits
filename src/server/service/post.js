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

    static all(){
        if(db.getType() == 'mongodb'){
            let conn = db.createConnection()
            let BlogPost = conn.model('post',Shemas.BlogPost)

            return new Promise((resolve)=>{
                try{
                    BlogPost.find({},null,{sort: '-date'},(err,docs)=>{
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
}

module.exports = Post
