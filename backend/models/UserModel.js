
const mongoose =  require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  wallets: {
    type: [String],
    required: [true, "Please add users wallet"],
  },
  verified: {
    type: Boolean,
    default: false
  }
});

//const User = mongoose.model("User", userSchema);
module.exports =  mongoose.model("Users", userSchema);
