
$(document).ready(function(){
  var contacts = new Contacts();
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
        console.log("Data added successfully");
      },
      error : function(){
        console.log("Some internal error occured!");
      }
    })
  })
  var viewContact = new contactsView();
});