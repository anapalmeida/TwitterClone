const express = require("express");
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

router.get("/", (req, res, next) => {
  Post.find()
    .populate("postedBy")
    .sort({ createdAt: -1 })
    .then((results) => res.status(200).send(results))
    .catch((err) => {
      console.log(err);
      payload.errorMessage = "Could not retrieve any tweets.";
      res.status(200).render("/", payload);
    });
});

router.post("/", async (req, res, next) => {
  var payload = {
    errorMessage: "",
  };

  if (!req.body.content) {
    console.log("Content param not sent with request");
    return res.sendStatus(400);
  }

  var postData = {
    content: req.body.content,
    postedBy: req.session.user,
    pinned: req.body.pinned,
  };

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: "postedBy" });
      res.status(201).send(newPost);
      console.log(newPost);
    })
    .catch((err) => {
      console.log(err);
      payload.errorMessage = "Your tweet wasn't able to be submitted";
      res.status(200).render("/", payload);
    });
});

router.put("/:id/like", async (req, res, next) => {
  var payload = {
    errorMessage: "",
  };

  var postId = req.params.id;
  var userId = req.session.user._id;
  var isLiked =
    req.session.user.likes && req.session.user.likes.includes(postId);

  var option = isLiked ? "$pull" : "$addToSet";

  console.log(isLiked, option, userId, postId);
});

module.exports = router;
