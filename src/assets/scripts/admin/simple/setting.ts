import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
const themes = require('server/themes.js')
import axios from "axios"
const {translateError,CODE} = require('utils/code.js')

@Component({
    template: require('./template/setting.pug')(),
})
export class Setting extends Vue {
    templates:any = themes

    template:string  = themes[0].name

    nickname:string = ''
    email:string = ''
    sitename:string = ''
    subname:string = ''


    statistics:string = ''

    loading:boolean = true

    onSubmit():void{
        axios.post('/admin/setting',{template:this.template,nickname:this.nickname,email:this.email,sitename:this.sitename,statistics:this.statistics,subname:this.subname}).then(res=>{
            if(res.data.code && res.data.code == CODE.OK){
                alert("success")
            }
        });
    }

    created():void{
        this.loading = true
        axios.get('/admin/setting').then(res=>{
            if(res.data.code && res.data.code == CODE.OK){
                let {template,nickname,email,sitename,statistics,subname} = res.data.info
                this.template = template
                this.nickname = nickname
                this.email = email
                this.sitename = sitename
                this.statistics = statistics
                this.subname = subname
            }
            this.loading = false

        })
    }
}
