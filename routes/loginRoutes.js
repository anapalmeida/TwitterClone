const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../schemas/UserSchema");

const app = express();
const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

router.get("/", (req, res, next) => {
  var payload = {
    pageTitle: "Twitter. Happening now / Twitter",
  };

  res.status(200).render("login", payload);
});

router.post("/", async (req, res, next) => {
  console.log("hey");
  var payload = req.body;

  if (req.body.logUsername && req.body.logPassword) {
    var user = await User.findOne({
      $or: [
        { username: req.body.logUsername },
        { email: req.body.logUsername },
      ],
    }).catch((err) => {
      console.log(err);
      payload.errorMessage = "Something went wrong.";
      res.status(200).render("login", payload);
    });

    if (user != null) {
      var result = await bcrypt.compare(req.body.logPassword, user.password);

      if (result === true) {
        req.session.user = user;
        return res.redirect("/");
      }
    }
    payload.errorMessage = "Login credentials incorrect.";
    return res.status(200).render("login", payload);
  }
  payload.errorMessage = "Make sure each field has a value.";
  res.status(200).render("login");
});

module.exports = router;
