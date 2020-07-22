const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/databasetest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("database connect succesfull ok");
});
