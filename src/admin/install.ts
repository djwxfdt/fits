import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'


@Component({
    template: require('./template/install.pug')()
})
class App extends Vue {
    db:Number = 0
    filename:string = ''
    dbname:string = ''
    dbpass:string = ''
    dbaddr:string = ''

}


new Vue({
    el: '#panel',
    render: (h) => h(App)
})
