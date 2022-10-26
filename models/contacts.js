const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  first_name : String,
  last_name : String,
  phone_number : String
})

module.exports = mongoose.model("Contacts", contactSchema);

