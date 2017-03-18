const auth = require('../test/datas/auth.json')


module.exports = app =>{
    app.use('/admin/home',(req,res,next)=>{
        if((req.user && req.user.token == auth.token)){
            next()
        }
        else{
            res.redirect('/admin/login?path=home')
        }
    })
}
