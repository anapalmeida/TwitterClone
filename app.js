const express = require("express");
const middleware = require("./middleware");
const path = require("path");
const mongoose = require("./database");

const app = express();
const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Express running → PORT ${port}`);
});

app.set("view engine", "pug");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Routes
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  var payload = {
    pageTitle: "Twitter",
  };

  res.status(200).render("home", payload);
});
