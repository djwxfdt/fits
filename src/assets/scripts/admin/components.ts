import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'

@Component({
    template: require('./template/foo.pug')(),
})
export class Foo extends Vue {
}
