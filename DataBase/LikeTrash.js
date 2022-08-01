const { model, Schema } = require("mongoose");

const schema = new Schema({
  petId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "AdoptedQuestionnaire",
  },

  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  date: {
    type: String,
    default: Date.now,
    expires: 2592000,
  },
});

module.exports = {
  LikeTrash: model("LikeTrash", schema),
};
