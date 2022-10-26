const express = require("express");

const router = express.Router();

const contactController = require("../controllers/contactController.js");

// Get Contacts 

router.get("/api/contactapp", contactController.getContacts);

// Add Contacts 

router.post("/api/contactapp", contactController.addContacts);

// Delete Contacts

router.delete("/api/contactapp/:id", contactController.deleteContacts);

// Update contacts 

router.put("/api/contactapp/:id", contactController.updateContacts);

module.exports = router;