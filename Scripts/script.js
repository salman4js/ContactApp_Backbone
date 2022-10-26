Backbone.Model.prototype.idAttribute = '_id';
// Backbone Model

var Contact = Backbone.Model.extend({
  defaults : {
    first_name : "",
    last_name : "",
    phone_number : ""
  },
})

// Backbone Collections

var Contacts = Backbone.Collection.extend({
  url: 'http://localhost:4000/api/contactapp'
});

// Initialize two Contacts

// var contact1 = new Contact({
//   first_name : "Salman",
//   last_name : "Azeem",
//   phone_number : "XXXXXXXXX"
// });
// 
// var contact2 = new Contact({
//   first_name : "Pooja",
//   last_name : "Asmitha",
//   phone_number : "XXXXXXXXX"
// });

// Initialize a Collections

var contacts = new Contacts();
// contacts.fetch({
//   success : function(response){
//     console.log("Hey its working!")
//   },
//   error : function(){
//     console.log("Some internal error!")
//   }
// })

// Backbone view for single contact

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

// Backbone view for all contacts

var contactsView = Backbone.View.extend({
  model : contacts,
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

var viewContact = new contactsView();


$(document).ready(function(){
  $('.add-contact').on("click", function(){
    var contact = new Contact({
      first_name : $('.first_name-input').val(),
      last_name : $('.last_name-input').val(),
      phone_number : $('.phone_number-input').val()
    });
    $('.first_name-input').val('');
    $('.last_name-input').val('');
    $('.phone_number-input').val('');
    contacts.add(contact);
    contact.save(null, {
        success : function(){
          console.log("Data added successfully!");
        },
        error : function(){
          console.log("Some internal error occured!");
        }
      }
    )
  })
})


// 8220154896