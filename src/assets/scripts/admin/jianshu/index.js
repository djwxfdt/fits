const Backbone = require('backbone')

import HomeView from './home.js'

import EditView from './edit.js'

import ListView from './list.js'

import TagView from './tags.js'




const Router = Backbone.Router.extend({
    routes:{
        '':'index',
        'list':'list',
        'new':'new',
        'edit/:id':'edit',
        'setting':'setting',
        'tags':'tags',

    },

    initialize:()=>{
        Backbone.history.start()
    },

    index:()=>{
        if(!this.homeView){
            this.homeView = new HomeView()
        }
        this.homeView.render()
    },

    new:()=>{
        if(!this.editView){
            this.editView = new EditView()
        }
        this.editView.new()
    },

    edit:(id)=>{
        if(!this.editView){
            this.editView = new EditView()
        }
        this.editView.init(id)
    },

    tags:()=>{
        if(!this.tagView){
            this.tagView = new TagView()
        }
        this.tagView.render()
    },

    list:()=>{
        if(!this.listView){
            this.listView = new ListView()
        }
        this.listView.render()
    }
})



new Router()
