const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username cannot be empty!"],
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email!"],
      unique: [true, "Email address has already taken!"],
    },
    password: {
      type: String,
      required: [true, "Please choose a strong password!"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
