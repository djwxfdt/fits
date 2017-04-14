const auth = require('../test/datas/auth.json')
const user = require('./service/user.js')

module.exports = app =>{

    global.installed = false
    
    if(user.installed()){
        global.installed = true
    }

    app.use('/install',(req,res,next)=>{
        if(req.method != 'GET'){
           return next()
        }
        if(!global.installed ){
            res.render('install')
        }
        else{
            res.render('install',{installed:true})
        }
    })

    app.use('/',(req,res,next)=>{
        if(!global.installed && req.method == 'GET' && app.get('env') === 'production'){
            res.redirect('/install')
        }
        else{
            next()
        }
    })

    app.use('/admin/home',(req,res,next)=>{
        if((req.user && req.user.token == auth.token)){
            next()
        }
        else{
            res.redirect('/admin/login?path=home')
        }
    })
}
