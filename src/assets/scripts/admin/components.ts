import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'

@Component({
    template: require('./template/welcome.pug')(),
})
export class Welcome extends Vue {
}


@Component({
    template: require('./template/edit.pug')(),
})
export class Edit extends Vue {
    article:string = ""
    finished:boolean = false

    send():void{
        console.log(this.article)
        this.finished = true
    }
}
