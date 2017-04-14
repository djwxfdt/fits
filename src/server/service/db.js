const user = require('./user.js')
var mongoose = require('mongoose')

class DB {
    constructor(){
        this.conn = null
    }

    createConnection(){
        if(this.conn == null){
            this.getType()
            if(this.db.type == 'mongodb'){
                this.conn = mongoose.createConnection(this.db.url)
            }
        }
        return this.conn
    }

    getType(){
        if(this.db){
            return this.db.type
        }
        this.db = user.getDb()
        return this.db.type
    }

}

module.exports = new DB()
