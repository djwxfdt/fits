import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import axios from "axios"
const code = require('../../../utils/code.js')
import VueRouter from 'vue-router'
import {Welcome,Edit} from './components'

Vue.use(VueRouter)

const router = new VueRouter({
   routes:[{ path: '/', component: Welcome },{ path: '/edit', component: Edit }]
})

@Component({
    template: require('./template/index.pug')()
})
class App extends Vue {
}


new Vue({
    router,
    el: '#panel',
    render: (h) => h(App)
})
