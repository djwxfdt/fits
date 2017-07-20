import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import axios from "axios"
const {translateError,CODE} = require('../../../utils/code.js')

@Component({
    template: require('./template/list.pug')(),
})
export class List extends Vue {

    list:Array<any> = []
    checkboxes:Array<any> = []

    created():void{
        this.refresh()
    }

    refresh(){
        axios.get('/admin/articles').then(res=>{
            if(res.data.code && res.data.code == CODE.OK){
                this.list = res.data.list
            }
        })
    }

    deleteItem():void{
        axios.post('/article/delete',{ids:this.checkboxes}).then(res=>{
            if(res.data.code && res.data.code == CODE.OK){
                this.refresh()
                this.checkboxes = []
            }
        })
    }
}
