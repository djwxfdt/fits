const Backbone = require('backbone')

import HomeView from './home.js'

const Router = Backbone.Router.extend({
    routes:{
        '':'index',
        '/list':'list',
        '/edit/:id':'edit',
        '/setting':'setting'
    },

    initialize:()=>{
        Backbone.history.start()
    },

    index:()=>{
        new HomeView().render()
    }
})



new Router()
