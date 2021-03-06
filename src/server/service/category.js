const {CategoryModel}  = require('./models.js')


class Category{
    static save(data){
        return new CategoryModel({title:data.title}).add()
    }

    static allWithCount(){
        return CategoryModel.allWithCount()
    }

    static all(){
        return CategoryModel.all()
    }

    static delete(ids){
        return CategoryModel.delete(ids)
    }

    static updateOne(data){
        return CategoryModel.updateOne(data)
    }
}

module.exports = Category
