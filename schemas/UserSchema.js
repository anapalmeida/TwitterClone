const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "/images/default_profile_400x400.png",
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

var User = mongoose.model("User", UserSchema);
module.exports = User;
