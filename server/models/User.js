const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Board = require("./Board");

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
    image: {
      type: String,
      required: true,
      default: "/images/default-profile.jpg",
    },
    joinDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
  },
  { collection: "User" }
);

// Remove a user
UserSchema.statics.deleteUser = function (id) {
  return this.deleteOne({ _id: id });
};

// Find a user by id
UserSchema.statics.findUser = function (id) {
  return this.findById(id);
};

// Find a user by email
UserSchema.statics.findByEmail = function (email) {
  return this.find({ email: email });
};

// Add a profile image
UserSchema.statics.addImage = function (id, image) {
  return this.updateOne(
    { _id: id },
    {
      $set: { image: image },
    }
  );
};

// Creates a user
UserSchema.statics.createUser = async function (email, hash) {
  const newUser = new User({
    email: email,
    password: hash,
  });

  const newBoard = await Board.createNewBoard("untitled");
  newBoard.save();
  newUser.boards = [newBoard._id];

  return newUser;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
