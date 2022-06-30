const { Like } = require("../../DataBase/Like");
const { LikeUser } = require("../../DataBase/LikeUser");

module.exports = {
	getPetsLikes: async (parent, { userId }) => {
		const likes = await Like.find({ userId: userId })
			.populate("petId")
			.populate("userId");

		return {
			likes: likes,
			numOfLikes: likes.length,
		};
	},

	getUserLikes: async (parent, { userId }) => {
		const likes = await LikeUser.find({ userId: userId })
			.populate("userId")
			.populate("likedUserId");

		return {
			likes: likes,
			numOfLikes: likes.length,
		};
	},
};
