const express = require("express");
const middleware = require("./middleware");
const mongoose = require("./database");
const path = require("path");
const session = require("express-session");

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
app.use(
  session({
    secret: "Why, Miss Elphaba – look at you. You're beautiful.",
    resave: true,
    saveUninitialized: false,
  })
);

// Routes
const loginRoute = require("./routes/loginRoutes");
const logoutRoute = require("./routes/logoutRoutes");
const registerRoute = require("./routes/registerRoutes");

app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  var payload = {
    pageTitle: "Twitter",
    userLoggedIn: req.session.user,
  };

  res.status(200).render("home", payload);
});
