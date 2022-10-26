var contactView = Backbone.View.extend({
  model : new Contact(),
  tagName : 'tr',
  initialize : function(){
    this.template = _.template($('.contact-list-template').html());
  },
  events : {
    'click .edit-contact' : 'edit',
    'click .update-contact' : 'update',
    'click .cancel-contact' : 'cancel',
    'click .delete-contact' : 'delete'
  },
  edit : function(){
    this.$('.edit-contact').hide();
    this.$('.delete-contact').hide();
    this.$('.update-contact').show();
    this.$('.cancel-contact').show();
    
    var first_name = this.$('.first_name').html();
    var last_name = this.$('.last_name').html();
    var phone_number = this.$('.phone_number').html();
    
    this.$('.first_name').html('<input type = "text" class = "form-control first_name-update" value = "'+ first_name + '">');
    this.$('.last_name').html('<input type = "text" class = "form-control last_name-update" value = "'+ last_name + '">');
    this.$('.phone_number').html('<input type = "text" class = "form-control phone_number-update" value = "'+ phone_number + '">');
  },
  
  update : function(){
    this.model.set('first_name', $('.first_name-update').val());
    this.model.set('last_name', $('.last_name-update').val());
    this.model.set('phone_number', $('.phone_number-update').val());
    
    this.model.save(null, {
      success : function(response){
        console.log(response.toJSON()._id);
      },
      error : function(err){
        console.log("Some internal error occured!");
      }
    })
  },
  delete : function(){
    this.model.destroy({
      success : function(response){
        console.log(response.toJSON()._id);
      },
      error : function(err){
        console.log("Some internal error occured!");
      }
    });
  },
  cancel : function(){
    viewContact.render();
  },
  render : function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});