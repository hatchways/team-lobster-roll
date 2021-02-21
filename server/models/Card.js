const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    name: {
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
CardSchema.statics.createNewCard = async function (name) {
  const card = new this({ name });
  await card.save();
  return card;
};

// deletes a Card in the db by its _id
CardSchema.statics.deleteCard = async function (cardId) {
  await this.deleteOne({ _id: mongoose.Types.ObjectId(cardId) });
};

// updates a specific card by its _id
CardSchema.statics.updateCard = async function (cardId, property, newData) {
  /*
		- the "property" param is the schema's property that is to be updated
		- the "newData" param is the updated data for a specific schema property
		- if the property does not exist, a new one will be created with "newData" as its data
		- note: "newData" must match the data structure of the schema property
	*/
  await this.updateOne(
    { _id: mongoose.Types.ObjectId(cardId) },
    { [property]: newData }
  );
};

const Card = mongoose.model("Card", CardSchema);
module.exports = Card;
