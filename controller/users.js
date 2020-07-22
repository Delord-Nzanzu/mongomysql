const User = require("../models/user");
const bsryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

module.exports = {
  enregistre: function (req, res, nex) {
    bsryptjs.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        res.json({ err });
      }
      let item = new User({
        name: req.body.name,
        password: hashedPass,
        level: req.body.level,
      });
      User.findOne({
        $and: [{ name: item.name }],
      })
        .then((username) => {
          if (username) res.status(403).json({ error: "user existe" });
          else
            item
              .save()
              .then((result) => {
                res.json(result);
              })
              .catch((error) => {
                console.log(error);
                res.status(403).json({ error });
              });
        })
        .catch((error) => {
          console.log(error);
          res.status(403).json({ error });
        });
    });
  },

  user: function (req, res) {
    User.find().then((result) => {
      if (result == "") res.status(403).json({ error: "empty" });
      else res.json(result);
    });
  },

  logine: function (req, res) {
    const username = req.body.name;
    const password = req.body.password;

    User.findOne({ $or: [{ name: username }] }).then((user) => {
      if (user) {
        bsryptjs.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({ error: err });
          } else if (result) {
            let token = jwt.sign(
              { name: user.name, level: user.level },
              "secretkey",
              {
                expiresIn: "1h",
              }
            );
            res.json({
              message: "successful",
              token,
            });
          } else {
            res.json({ message: "password not trouve" });
          }
        });
      } else {
        res.json({ message: "no user found" });
      }
    });
  },
};
