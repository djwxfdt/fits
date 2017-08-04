const Backbone = require('backbone')
import template from './template/list.hbs'
import $ from 'jquery'

const Model = Backbone.Model.extend({})

const Collection = Backbone.Collection.extend({
    model: Model,
    url: '/admin/articles',
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
    events: {
      'click .table.edit'         : 'edit',
      'click .delete'       : 'delete',
    },
    initialize: function() {
        this._cl = new Collection()
        this._cl.fetch()
        this.listenTo(this._cl, 'reset', this.render)
    },
    render: function() {
        this.$el.html(this.template({list:this._cl.toJSON()}))
        return this
    },
    edit:function(){

    },
    delete:function(){
        
    }
})
