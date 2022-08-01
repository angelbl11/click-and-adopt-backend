const { Schema, model } = require("mongoose");
const schema = new Schema({
  sender: {
    required: true,
    type: String,
  },
  receiver: {
    required: true,
    type: String,
  },
});

module.exports = {
  Chat: model("Chats", schema),
};
