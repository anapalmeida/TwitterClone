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
    pageTitle: "Create an account",
  };

  res.status(200).render("register", payload);
});

router.post("/", async (req, res, next) => {
  var firstName = req.body.firstName.trim();
  var lastName = req.body.lastName.trim();
  var email = req.body.email.trim();
  var username = req.body.username.trim();
  var password = req.body.password;

  var payload = req.body;

  if (firstName && lastName && username && email && password) {
    var user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((err) => {
      console.log(err);
      payload.errorMessage = "Something went wrong.";
      res.status(200).render("register", payload);
    });

    if (user === null) {
      var data = req.body;
      data.password = await bcrypt.hash(password, 10);
      User.create(data).then((user) => {
        console.log(user);
      });
    } else {
      if (email === user.email) {
        payload.errorMessage = "Email already in use.";
      } else {
        payload.errorMessage = "Username already in use.";
      }
      res.status(200).render("register", payload);
    }
  } else {
    payload.errorMessage = "Make sure each field has a valie value.";
    res.status(200).render("register", payload);
  }
});

module.exports = router;
