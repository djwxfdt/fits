const auth = require('../test/datas/auth.json')

module.exports.encryptPassword = originPassword => {
    let pass = (originPassword || '').toString()
    let res = ''
    for(let c of pass){
        res += String.fromCharCode(c.charCodeAt(0) + 1)
    }
    return res
}
