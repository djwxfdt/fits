var mongoose = require('mongoose')
var Schema = mongoose.Schema

const categorySchema = new Schema({
    title   :String
})

const commentSchema = new Schema({
    author : String,
    body:String
})

const blogSchema = new Schema({
    title     : String,
    body      : String,
    poster      : String,
    date      : Date,
    deleted   :Boolean,
    visits    :Number,
    comments : [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    category : {type: Schema.Types.ObjectId, ref: 'category' }
})


blogSchema.statics.findAllAlive = function(){
    return this.find({ deleted: { $ne: true },_id:{$exists:true} },null,{sort: '-date'}).populate('category').exec()
}


blogSchema.methods.saveOne = function(){
    let data = this.data

    let model = this.model('post')
    model.title = data.title
    model.body = data.body
    model.poster = data.poster
    model.date = new Date().getTime()
    if(data.category){
        model.category = data.category
    }
    return new Promise((resolve)=>{
         model.save((err,data)=>{
             resolve(data)
         })
    })
}

blogSchema.statics.updateOne = function(data){
    let {article,title,category,id,poster} = data

    return this.findById(id).then(doc=>{
        if(article){
            doc.body = article
        }
        if(title){
            doc.title = title
        }
        if(category){
            doc.category = category
        }
        if(poster){
            doc.poster = poster
        }
        return doc.save()
    })
}

blogSchema.statics.getById = function(id){
    return this.model('post').findOne({_id:id}).populate('category')
}


blogSchema.statics.pick = function(n){
    return this.find({ deleted: { $ne: true },_id:{$exists:true} },['title','_id'],{sort: '-date',limit:n}).exec()
}

blogSchema.statics.deleteByIds = function(ids){
    let prs = ids.map(id=>new Promise((resolve)=>{
        this.findById(id,(err,doc)=>{
            if(!err && doc){
                doc.deleted = true
                doc.save()
            }
            resolve()
        })
    }))
    return Promise.all(prs)
}

blogSchema.statics.getByCategory = function(id){
    return this.find({category:id,deleted: { $ne: true },_id:{$exists:true} },null,{sort: '-date'}).exec()
}

categorySchema.statics.allWithCount = function(){
    return this.aggregate([
        {'$lookup':{
            from:'posts',
            localField:'_id',
            foreignField:'category',
            as:'posts'
        }}
    ]).exec().then(docs=>new Promise(r=>r(docs.map(doc=>{
        return {
            title:doc.title,
            _id:doc._id,
            count:doc.posts.length
        }
    }))))
}

categorySchema.statics.all = function(){
    return this.find().exec()
}

categorySchema.methods.add = function(){
    return this.save()
}

categorySchema.statics.deleteByIds = function(ids){
    let prs = ids.map(id=>this.remove({_id:id}).exec())
    return Promise.all(prs)
}


module.exports = {
    blogSchema,
    commentSchema,
    categorySchema
}
