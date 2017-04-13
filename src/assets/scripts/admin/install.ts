import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import axios from "axios"
const code = require('../../../utils/code.js')

@Component({
    template: require('./template/install.pug')()
})
class App extends Vue {
    db:Number = 0
    filename:string = ''
    dbname:string = ''
    dbpass:string = ''
    dbaddr:string = ''
    state:Number = 0
    watting:Boolean = false
    errMsg:string = ""

    sitename:string = ''
    account:string = ''
    password:string = ''
    email:string = ''

    onSubmit(e):void{
        if(this.db == 0){
            this.state = 1
            this.filename = this.filename || "fizz"

        }
        else{
            this.watting = true
            this.dbaddr = this.dbaddr || "localhost:27017"
        }

        axios.post('/install/checkDB',{
            type:this.db,
            filename:this.filename,
            name:this.dbname,
            pass:this.dbpass,
            addr:this.dbaddr
        }).then(res=>{
            if(res.data.code){
                if(res.data.code == 1){
                    this.state = 1
                }
                else{
                    this.errMsg = code(res.data.code)
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
                    this.errMsg = code(res.data.code)
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
