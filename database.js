const mongoose = require("mongoose");

require("dotenv").config();

const mongodb_uri = process.env.MONGODB_URI;

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(mongodb_uri)
      .then(() => {
        console.log("Database connection was successful");
      })
      .catch((err) => {
        console.log("Database connection was not successful: " + err);
      });
  }
}

module.exports = new Database();
