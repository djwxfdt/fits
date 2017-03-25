import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'

@Component({
    template: require('./template/welcome.pug')(),
})
export class Welcome extends Vue {
}
