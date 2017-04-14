import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import axios from "axios"
const {translateError,CODE} = require('../../../utils/code.js')

interface DB {
    [key: number]: string;
}

@Component({
    template: require('./template/install.pug')()
})
class App extends Vue {
    db:number = 0
    filename:string = ''
    dbname:string = ''
    dbpass:string = ''
    dbaddr:string = ''
    state:number = 0
    watting:boolean = false
    errMsg:string = ""

    sitename:string = ''
    account:string = ''
    password:string = ''
    email:string = ''

    type:DB = {
        0:'sqlite',
        1:'mongodb'
    }

    onSubmit(e):void{
        if(this.db == 0){
            this.state = 1
            this.filename = this.filename || "fizz"

        }
        else{
            this.watting = true
            this.dbaddr = this.dbaddr || "localhost:27017"
            this.dbname = this.dbname || 'fizz'
        }

        axios.post('/install/checkDB',{
            type:this.type[this.db],
            filename:this.filename,
            name:this.dbname,
            pass:this.dbpass,
            addr:this.dbaddr
        }).then(res=>{
            if(res.data.code){
                if(res.data.code == CODE.OK){
                    this.state = 1
                }
                else{
                    this.errMsg = translateError(res.data)
                    console.error(this.errMsg)
                    
                }
            }
            else{
                this.errMsg = "服务器错误！"
            }
            this.watting = false
        }).catch(err=>{
            this.errMsg = err
            this.watting = false
        })
    }

    onOk(e):void{
         axios.post('/install/save',{
            type:this.db,
            filename:this.filename,
            name:this.dbname,
            pass:this.dbpass,
            addr:this.dbaddr,
            sitename:this.sitename,
            account:this.account,
            password:this.password,
            email:this.email
        }).then(res=>{
            if(res.data.code){
                if(res.data.code == 1){
                    window.location.href = "/admin/home"
                }
                else{
                    this.errMsg = translateError(res.data)
                }
            }
            else{
                this.errMsg = "服务器错误！"
            }
            this.watting = false
        }).catch(err=>{
            this.errMsg = err
            this.watting = false
        })
    }

}


new Vue({
    el: '#panel',
    render: (h) => h(App)
})
