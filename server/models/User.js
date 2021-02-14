const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
    },
    password: {
      type: String,
      minlength: 7,
      required: true,
    },
    joinDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { collection: "User" }
);

// Remove a user **
UserSchema.statics.deleteUser = function (userEmail) {
  return this.deleteOne({ email: userEmail });
};

// Find a user by email **
UserSchema.statics.findByEmail = function (userEmail) {
  return this.find({ email: userEmail });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
