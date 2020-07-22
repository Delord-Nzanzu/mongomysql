const express = require("express");
const controler = require("../controller");
const modolware = require("../midollware");

const route = express.Router();
route.use(modolware.jwtsecr.verifyToken);
route.get("/", controler.users.user);

module.exports = route;
