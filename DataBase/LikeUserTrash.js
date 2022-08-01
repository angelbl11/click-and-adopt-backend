const { model, Schema } = require("mongoose");

const schema = new Schema({
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  likedUserId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "AdopterQuestionnaire",
  },

  date: {
    type: String,
    default: Date.now,
    expires: 2592000,
  },
});

module.exports = {
  LikeUserTrash: model("LikeUserTrash", schema),
};
