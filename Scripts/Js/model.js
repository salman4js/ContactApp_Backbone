Backbone.Model.prototype.idAttribute = '_id';


var Contact = Backbone.Model.extend({
  defaults : {
    first_name : "",
    last_name : "",
    phone_number :""
  },
})