const lowdb = require('lowdb')
const path = require('path')
const {encryptPassword} = require('../../utils/encrypt.js')

class User{

    constructor(){
        this.db = lowdb(path.join(global.appRoot,'data','install.json'))
        this.account = null
        this.email = null
        this.sitename = null

    }

    save(type,data){
        this.db.set(type,data).write()
    }

    getName(){
        return this.db.get('user.nickname').value() || 'admin'
    }

    verify(account,password){
        if(this.db.get('user.account').value() ==account && this.db.get('user.password').value() == encryptPassword(password)){
            return true
        }
        return false
    }

}

module.exports = new User()
