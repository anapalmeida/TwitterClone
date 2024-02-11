const express = require("express");

const app = express();
const port = 3003;

const server = app.listen(port, () => {
  console.log(`Express running → PORT ${port}`);
});

app.set("view engine", "pug");
app.set("views", "views");

app.get("/", (req, res, next) => {
  res.status(200).render("home");
});
