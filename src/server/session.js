const session = require('express-session')

module.exports = app => {
    app.use(session({
        secret:'fizz secret'
    }))

    app.use((req,res,next)=>{
        if(req.session){
            req.user = req.session.user
        }
        next()
    })
}
