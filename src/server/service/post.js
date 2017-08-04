const {BlogModel}  = require('./models.js')

class Post{
    static save(data){
        return new BlogModel({data}).save()
    }

    static update(data){
        return BlogModel.updateOne(data)
    }

    static all(){
        return  BlogModel.findAllAlive()
    }

    static getByCategory(id){
        return BlogModel.getByCategory(id)
    }

    static pick(n = 1){
        return BlogModel.pick(n)
    }

    static get(id){
        return BlogModel.getById(id)
    }

    static delete(ids){
        return BlogModel.deleteByIds(ids)
    }

}

module.exports = Post
