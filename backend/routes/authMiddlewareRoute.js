const express = require("express");
const route = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

route.post("/middle")