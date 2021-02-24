const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
    },
    deadline: {
      type: String,
    },
    tags: [
      {
        name: {
          type: String,
        },
      },
    ],
    attachments: [
      {
        src: {
          type: String,
        },
      },
    ],
  },
  { collection: "Card" }
);

// gets card by _id
CardSchema.statics.findCard = async function (cardId) {
  const foundCard = await Card.findById(cardId);
  return foundCard;
};

// creates a new instance of the Card model and returns the saved instance
CardSchema.statics.createNewCard = async function (title) {
  const card = new this({ title });
  await card.save();
  return card;
};

// deletes a Card in the db by its _id
CardSchema.statics.deleteCard = async function (cardId) {
  await this.deleteOne({ _id: mongoose.Types.ObjectId(cardId) });
};

const Card = mongoose.model("Card", CardSchema);
module.exports = Card;
