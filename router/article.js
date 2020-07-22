const express = require("express");
const secretroute = require("../midollware");
const controle = require("../controller");
const route = express.Router();

route.use(secretroute.jwtsecr.verifyToken);
route.post("/newarticle", controle.articles.add);
route.get("/", controle.articles.article);
module.exports = route;
