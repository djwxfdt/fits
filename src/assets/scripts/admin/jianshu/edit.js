const Backbone = require('backbone')
import template from './template/edit.hbs'
import $ from 'jquery'

const Model = Backbone.Model.extend({
    url:'/article/',
    defaults:{
        title:'未命名标题'
    },
    fetch:function(id){
        $.ajax({
            type: 'GET',
            url: this.url + id,
            dataType: 'json',
            success: (data) => {
                if(data.code == 80000){
                    let doc = data.article
                    this.set({title:doc.title,body:doc.body,tag:doc.category && doc.category.title,id:doc._id,poster:doc.poster})
                }
            }
        })
    },
    reset:function(){
        this.clear()
        this.set({title:this.defaults.title})
    }
})

export default Backbone.View.extend({
    template,
    el: '#app',
    events: {
      'click .save'       : 'save',
    },
    render:function(){
        this.$el.html(this.template(this._md.toJSON()))
        this.mde = new window.SimpleMDE({element: document.getElementById('editor')})
        this.mde.value(this._md.get('body'))
        return this
    },
    initialize:function(){
        this._md = new Model()
        this.listenTo(this._md, 'change', this.render)
    },

    new:function(){
        this._md.reset()
        this.render()
    },

    init:function(id){
        this._md.clear()
        this._md.fetch(id)
        this.render()
    },

    save:function(){
        let id = $('.btn.save').data('id')
        let poster = $('.poster').val()
        let title = $('.input.title').val()
        let tag = $('.tag').val()

        let article = this.mde.value()

        $.post('/article/save',{id,poster,title,article},(data)=>{
            if(data.code == 80000){
                alert('保存成功！')
            }
        })

    }



})
