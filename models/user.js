const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userchema = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    level: {
      type: Number,
    },
  },
  {
    timestamps: false,
  }
);

const user = mongoose.model("user", userchema);
module.exports = user;
