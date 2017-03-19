import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import axios from "axios"
const code = require('../../../utils/code.js')


@Component({
    template: require('./template/index.pug')()
})
class App extends Vue {
}