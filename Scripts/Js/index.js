 var contactApplication = new Marionette.Application();
 
// Model for the contact application
var contactModel = Backbone.Model.extend({

});

// Collection for the contact application
var contactCollection = Backbone.Collection.extend({
    model : contactModel
});

// Single view for the contact item
var contactView = Marionette.View.extend({
    template : '#contactListView'
});

// No contact view
var noContactView = Marionette.View.extend({
    template : '#noContactListView'
})

// Collection of contact list view
var contactsView = Marionette.CollectionView.extend({
    ItemView : contactView,
    emptyView : noContactView
});

// Form View to add the contact to the server
var FormView = Marionette.View.extend({
    template : '#formView',
    events : {
        'click .add-contact' : 'addContact'
    },
    ui : {
        first_name : '.first_name',
        last_name : '.last_name',
        phone_number : '.phone_number'
    },
    addContact : function(){
        this.collection.add({
            first_name : this.ui.first_name.val(),
            last_name : this.ui.last_name.val(),
            phone_number : this.ui.phone_number.val()
        });
        this.ui.first_name.val("");
        this.ui.last_name.val("");
        this.ui.phone_number.val("");
    }
});


var MyView = Marionette.View.extend({
  regions : {
    form : '#form',
    list : '#list'
  }
});

var myView = new MyView();
var formView = new FormView();
var formRegion = myView.getRegion('form');
formRegion.show(formView);
// contactApplication.addInitializer(function(){
//     contactApplication.contact = new contactCollection();
// 
//     contactApplication.form.show(new FormView({collection : contactApplication.contact}));
//     contactApplication.list.show(new contactsView({collection : contactApplication.contact}));
// });

// contactApplication.start();


// contactApplication.addInitializer(function(){
//     contactApplication.contact = new contactCollection();
// 
//     contactApplication.form.show(new FormView({collection : contactApplication.contact}));
//     contactApplication.list.show(new contactsView({collection : contactApplication.contact}));
// });

contactApplication.start();



