const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: false,
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
      minlength: 6,
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

// Remove a user
UserSchema.statics.deleteUser = function (id) {
  return this.deleteOne({ _id: id });
};

// Find a user by id
UserSchema.statics.findUser = function (id) {
  return this.find({ _id: id });
};

// Find a user by email
UserSchema.statics.findByEmail = function (email) {
  return this.find({ email: email });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
