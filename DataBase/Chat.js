const { Schema, model } = require("mongoose");
const schema = new Schema({
  sender: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  receiver: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User"
  },
});

module.exports = {
  Chat: model("Chats", schema),
};
