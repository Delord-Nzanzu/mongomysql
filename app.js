const express = require("express");
const bodyparser = require("body-parser");
const connectmongo = require("./connectionmongdb");
const morgane = require("morgan");
const router = require("./router");
const route = require("./router/user");

const port = process.env.port || 8000;

const app = express();
app.use(morgane("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/auth", router.auth);
app.use("/users", router.user);
app.use("/article", router.article);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
