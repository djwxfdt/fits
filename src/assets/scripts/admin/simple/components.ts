import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import axios from "axios"
const {translateError,CODE} = require('utils/code.js')

@Component({
    template: require('./template/welcome.pug')(),
})
export class Welcome extends Vue {
    time:string = ''

    created():void{
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        this.time = `${year}年${month}月${day}日`
    }
}
