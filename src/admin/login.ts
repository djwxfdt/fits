import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'

@Component({
    template: require('./template/login.pug')()
})
class App extends Vue {
     message:string = 'hello'
}

new Vue({
    el: '#panel',
    render: (h) => h(App)
})
