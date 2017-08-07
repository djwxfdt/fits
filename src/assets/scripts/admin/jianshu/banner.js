const Backbone = require('backbone')
import template from './template/banner.hbs'

const Model = Backbone.Model.extend({})

import $ from 'jquery'

const Collection = Backbone.Collection.extend({
    model: Model,
    url: '/admin/banners',
    fetch: function() {
        $.ajax({
            type: 'GET',
            url: this.url,
            dataType: 'json',
            success: (data) => {
                if(data.code == 80000){
                    this.reset(data.list)
                }
            }
        })
    }
})


export default Backbone.View.extend({
    template,
    el: '#app',
    events:{
        'click .add':'add',
        'click .delete':'delete'
    },

    render:function(){
        this.$el.html(this.template({list:this._cl.toJSON()}))
        return this
    },
    initialize:function(){
        this._cl = new Collection()
        this._cl.fetch()
        this.listenTo(this._cl, 'reset', this.render)

    },
    delete:function(e){
        let id = $(e.target).data('id')
        $.post('/admin/deletebanner',{id},(data)=>{
            if(data.code == 80000){
                window.location.reload()
            }
        })
    },

    add:function(){
        let url = $('.add-url').val()
        let image = $('.add-url').val()

        $.post('/admin/banner',{url,image},(data)=>{
            if(data.code == 80000){
                window.location.reload()
            }
        })
    }
})
