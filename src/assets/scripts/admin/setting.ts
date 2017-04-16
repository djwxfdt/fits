import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
const themes = require('../../../server/themes.js')

@Component({
    template: require('./template/setting.pug')(),
})
export class Setting extends Vue {
    templates:any = themes

    template:string  = themes[0].name

    nickname:string = ''
    email:string = ''
    sitename:string = ''

    statistics:string = ''

    onSubmit():void{

    }

    created():void{
    }
}
