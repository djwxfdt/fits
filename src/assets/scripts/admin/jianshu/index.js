const Backbone = require('backbone')

import HomeView from './home.js'

import EditView from './edit.js'


const Router = Backbone.Router.extend({
    routes:{
        '':'index',
        'list':'list',
        'new':'edit',
        'edit/:id':'edit',
        'setting':'setting'
    },

    initialize:()=>{
        Backbone.history.start()
    },

    index:()=>{
        new HomeView().render()
    },

    edit:()=>{
        new EditView().render()
    }
})



new Router()
