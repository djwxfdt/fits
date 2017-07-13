const lowdb = require('lowdb')
const path = require('path')
const {encryptPassword} = require('../../utils/encrypt.js')

class User{

    constructor(){
        this.db = lowdb(path.join(global.appRoot,'data','install.json'))
        this.account = null
        this.email = null
    }

    installed(){
        return this.db.get('installed').value()
    }

    save(type,data){
        this.db.set(type,data).write()
    }

    get(type){
        this.db.get(type).value()
    }

    getName(){
        return this.db.get('user.nickname').value() || 'admin'
    }

    getSiteName(){
        return this.db.get('user.sitename').value()
    }

    getTheme(){
        return this.db.get('user.template').value() || 'simple'
    }

    getEmail(){
        return this.db.get('user.email').value()
    }

    getStatistics(){
        return this.db.get('user.statistics').value()
    }

    verify(account,password){
        if(this.db.get('user.account').value() ==account && this.db.get('user.password').value() == encryptPassword(password)){
            return true
        }
        return false
    }

    getInfo(){
        return {
            nickname:this.getName(),
            sitename:this.getSiteName(),
            theme:this.getTheme()
        }
    }

    getSetting(){
        return {
            nickname:this.getName(),
            sitename:this.getSiteName(),
            template:this.getTheme(),
            email:this.getEmail(),
            statistics:this.getStatistics()
        }
    }

    getDb(){
        return this.db.get('db').value()
    }

}

module.exports = new User()
