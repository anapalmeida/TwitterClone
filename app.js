const express = require("express");
const middleware = require("./middleware");

const app = express();
const port = 3003;

const server = app.listen(port, () => {
  console.log(`Express running → PORT ${port}`);
});

app.set("view engine", "pug");
app.set("views", "views");

app.get("/", middleware.requireLogin, (req, res, next) => {
  var payload = {
    pageTitle: "Twitter",
  };

  res.status(200).render("home", payload);
});
