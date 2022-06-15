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
});

module.exports = {
  Like: model("Like", schema),
};
