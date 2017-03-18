import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import axios from "axios"
import code = require("../../../utils/code.js")

@Component({
    template: require('./template/login.pug')()
})
class App extends Vue {
     username:string = ""
     password:string = ""
     checked:boolean = true
     errMsg:string = ""

     onClick(e):void{
         if(this.username.length == 0){
             this.errMsg = "请输入用户名！"
             return
         }
         if(this.password.length == 0){
             this.errMsg = "请输入密码！"
             return
         }
         axios.post('/admin/login',{
             username:this.username,
             password:this.password,
             save:this.checked
         }).then(res=>{
             if(res.data.code){
                if(res.data.code == 1){
                    window.location.href= "/admin/home"
                }
                else{
                    this.errMsg = code(res.data.code)
                }
            }
             
         }).catch(err=>{
             this.errMsg = err
         })
     }
}

new Vue({
    el: '#panel',
    render: (h) => h(App)
})
