const express = require("express");
const User = require("../../schemas/UserSchema");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

router.get("/", (req, res, next) => {});

router.post("/", async (req, res, next) => {
  if (!req.body.content) {
    console.log("Content param not sent with request");
    return res.sendStatus(400);
  }

  res.status(200).send("It worked");
});

module.exports = router;
