const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  name: String,
  picture: String,
});

module.exports = User = mongoose.model("user", UserSchema);
