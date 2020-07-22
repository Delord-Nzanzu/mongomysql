const express = require("express");
const controllers = require("../controller");

const auth = express.Router();

auth.post("/enregistrer", controllers.users.enregistre);
auth.post("/logine", controllers.users.logine);

module.exports = auth;
