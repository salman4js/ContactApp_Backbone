var contactsView = Backbone.View.extend({
  model : new Contacts(),
  el : $('.contacts-list'),
  initialize : function(){
    var self = this;
    this.model.on('add', this.render, this);
    this.model.on('change', function(){
      setTimeout(function(){
        self.render();
      }, 30)
    }, this);
    this.model.on('remove', this.render, this);
    
    this.model.fetch({
      success : function(response){
        console.log("Data fetched fine")
      },
      error : function(){
        console.log("Internal error!")
      }
    });
  },
  render : function(){
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(contact){
      self.$el.append((new contactView({model : contact})).render().$el);
    })
  }
});
