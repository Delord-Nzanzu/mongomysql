const model = require("../models");
const shortid = require("shortid");
const { where } = require("../models/user");

module.exports = {
  add: function (req, res) {
    const { user } = req;
    const prix = req.body.prix;
    const prixs = parseInt(prix, 10);
    let item = new model.articles({
      id: shortid.generate(),
      typearticle: req.body.typearticle,
      prix: prixs,
    });
    if (user.level == 5) {
      model.articles
        .findOne({ where: { typearticle: item.typearticle } })
        .then((article) => {
          if (!article) {
            item.save().then((articlesave) => {
              res.json({ articlesave });
            });
          } else {
            model.articles
              .update(
                { prix: item.prix },
                { where: { typearticle: item.typearticle } }
              )
              .then((modifyc) => {
                res.json({ modifyc });
              })
              .catch((err) => {
                console.log(err);
                res.status(403).json({ err });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({ err });
        });
    } else {
      console.log("pas de droit");
      res.status(403).json({ message: "pas de droit" });
    }
  },
  article: function (req, res) {
    model.articles.findAll({}).then((article) => {
      res.json({ article });
    });
  },
};
