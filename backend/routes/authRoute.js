const express = require("express");
const route = express.Router();
const { SignUp, SignIn } = require("../controllers/authController");

// defin the auth routes

route.post("/signup", SignUp);
route.post("/signin", SignIn);

module.exports = route;