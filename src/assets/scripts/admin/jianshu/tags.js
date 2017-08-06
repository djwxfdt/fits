const Backbone = require('backbone')
import template from './template/tags.hbs'

const Model = Backbone.Model.extend({})

import $ from 'jquery'

const Collection = Backbone.Collection.extend({
    model: Model,
    url: '/admin/tags',
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
        'click .save':'save'
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
    save:function(e){
        let $dom = $(e.target)
        let id = $dom.data('id')

        let icon = $(`#${id} .icon`).val()

        $.post('/admin/tag/',{id,icon},(data)=>{
            if(data.code == 80000){
                alert('修改成功')
            }
        })


    }
})
