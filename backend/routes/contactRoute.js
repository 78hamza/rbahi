const { ContactController } = require("../controllers/contactController");
const express = require('express');
const route = express.Router();

// defin teh route
route.post('/contact', ContactController);

module.exports = route;