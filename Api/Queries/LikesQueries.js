const { Like } = require("../../DataBase/Like");
const { LikeUser } = require("../../DataBase/LikeUser");

module.exports = {
	getPetsLikes: async (parent, { userId }) => {
		return await Like.find({ userId: userId })
			.populate("petId")
			.populate("userId");
	},

	getUserLikes: async (parent, { userId }) => {
		return await LikeUser.find({ userId: userId })
			.populate("userId")
			.populate("likedUserId");
	},
};
