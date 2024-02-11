const express = require("express");

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

router.post("/", (req, res, next) => {
  var firstName = req.body.firstName.trim();
  var lastName = req.body.lastName.trim();
  var email = req.body.email.trim();
  var username = req.body.username.trim();
  var password = req.body.password;

  var payload = req.body;

  if (firstName && lastName && username && email && password) {
  } else {
    payload.errorMessage = "Make sure each field has a valie value.";
    res.status(200).render("register", payload);
  }
});

module.exports = router;
