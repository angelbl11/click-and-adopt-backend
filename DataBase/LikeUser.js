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
		ref: "User",
	},

	date: {
		required: true,
		type: String,
	},
});

module.exports = {
	LikeUser: model("LikeUser", schema),
};
