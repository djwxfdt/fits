import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import axios from "axios"
const code = require('utils/code.js')
import VueRouter from 'vue-router'
import {Welcome} from './components'
import {Setting} from './setting'
import {Edit} from './edit'
import {List} from './list'



Vue.use(VueRouter)

const router = new VueRouter({
   routes:[{ path: '/', component: Welcome },{ path: '/edit', component: Edit },{ path: '/edit/:id', component: Edit },{path:'/setting',component:Setting},{path:'/list',component:List}]
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
