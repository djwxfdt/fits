const log = require('../log.js')
const {CODE} = require('../../utils/code.js')
const user = require('../service/user.js')
const Post = require('../service/post.js')
const Category = require('../service/category.js')
const Timer = require('../../utils/timer.js')

module.exports.login = (req,res)=>{
    res.render('login')
}

module.exports.postlogin = (req,res)=>{
    let account = req.body.username
    let password = req.body.password
    if(user.verify(account,password)){
        log.info('login success!')
        req.session.user = {token:1}
        res.send({code:CODE.OK})
    }
    else{
        log.warn('login error!')
        res.send({code:CODE.ERROR_LOGIN})
    }
}

module.exports.home = (req,res)=>{
    res.render(`admin/${user.getTheme()}/home`)
}


module.exports.postSetting = (req,res)=>{
    let {template,nickname,email,sitename,statistics,subname} = req.body
    user.save('user.template',template)
    user.save('user.nickname',nickname)
    user.save('user.email',email)
    user.save('user.sitename',sitename)
    user.save('statistics',statistics)
    user.save('user.subtitle',subname)
    res.send({code:CODE.OK})
}

module.exports.setting = (req,res)=>{
    res.send({code:CODE.OK,info:user.getSetting()})
}

module.exports.articles = (req,res)=>{
    Post.all().then(docs=>{
        let list = docs.map(item=>{
            return {
                id:item._id,
                title:item.title,
                date:Timer.Format(item.date,'yyyy-MM-dd hh:mm:ss'),
                visits:item.visits,
                category:item.category
            }
        })
        res.send({code:CODE.OK,list})
    }).catch(err=>{
        log.error(err)
    })
}

module.exports.categories = (req,res)=>{
    Category.all().then(list=>{
        res.send({
            code:CODE.OK,
            list:list.map(item=>{
                return {
                    title:item.title,
                    id:item._id
                }
            })
        })
    })
}

module.exports.postcategory = (req,res)=>{
    let title = req.body.title
    Category.save({title}).then(doc=>{
        res.send({
            code:CODE.OK,
            doc
        })
    })
}
