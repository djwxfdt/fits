module.exports.postcheckDB = (req,res,next) =>{
    res.send({code:1})
}

module.exports.postsave = (req,res,next)=>{ 
    global.installed = true
    res.send({code:1})
}