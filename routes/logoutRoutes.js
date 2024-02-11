const express = require("express");
const User = require("../schemas/UserSchema");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

router.get("/", (req, res, next) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
});

module.exports = router;
