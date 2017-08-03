const Backbone = require('backbone')
import template from './template/edit.hbs'

const Model = Backbone.Model.extend({
    defaults:{
        description:'欢迎登录Fitz系统'
    }
})

export default Backbone.View.extend({
    template,
    el: '#app',
    render:function(){
        this.$el.html(this.template(new Model().toJSON()))
        new window.SimpleMDE({element: document.getElementById('editor')})
        return this
    },
    initialize:function(){
    }

})
