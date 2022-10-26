const Contact = require("../models/contacts.js");

const addContacts = (req,res,next) => {
  const contact = new Contact({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    phone_number : req.body.phone_number
  })
  contact.save()
    .then(resp => {
      res.status(200).json({
        success : true,
        message : "Contact added"
      })
    })
    .catch(err => {
      res.status(404).json({
        success :  false,
        message : "Some internal error occured!"
      })
    }) 
}

const getContacts = (req,res,next) => {
  Contact.find({})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(404).json({
      success : false,
      message : "Some internal error has occured!"
    })
  }) 
}

const deleteContacts = (req,res,next) => {
  console.log("Id is " ,req.params.id);
  Contact.findOneAndDelete({_id : req.params.id})
    .then(data => {
      res.status(200).json({
        success : true,
        message : data
      })
    })
    .catch(err => {
      res.status(404).json({
        success : false,
        message : "Some internal error occured!"
      })
    })
}

const updateContacts = (req,res,next) => {
  console.log("Id is" ,req.params.id);
  Contact.findByIdAndUpdate(req.params.id,{
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    phone_number : req.body.phone_number
  })
  .then(data => {
    res.status(200).jon({
      success : true,
      message : "Data updated!"
    })
  })
  .catch(err => {
    res.status(404).json({
      success : false,
      message : "Some internal error occured!"
    })
  })
}


module.exports = {
  addContacts, getContacts, deleteContacts, updateContacts
}