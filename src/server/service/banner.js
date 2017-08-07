const {BannerModel}  = require('./models.js')


class Banner{
    static save(data){
        return new BannerModel({url:data.url,image:data.image}).add()
    }

    static deleteById(id){
        return BannerModel.delete(id)
    }

    static all(){
        return BannerModel.all()
    }

}

module.exports = Banner
