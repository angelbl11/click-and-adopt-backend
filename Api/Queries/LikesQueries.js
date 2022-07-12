const { Like } = require("../../DataBase/Like");
const { LikeUser } = require("../../DataBase/LikeUser");
const { LikeTrash } = require("../../DataBase/LikeTrash");
const { LikeUserTrash } = require("../../DataBase/LikeUserTrash");

module.exports = {
	getPetsLikes: async (parent, { userId }) => {
		const likes = await Like.find({ userId: userId })
			.populate("petId")
			.populate("userId")
			.populate({
				path: "petId",
				model: "AdoptedQuestionnaire",
				populate: {
					path: "userId",
					model: "User",
				},
			});

		return {
			likes: likes,
			numOfLikes: likes.length,
		};
	},

	getUserLikes: async (parent, { userId }) => {
		const likes = await LikeUser.find({ userId: userId })
			.populate("userId")
			.populate("likedUserId")
			.populate({
				path: "likedUserId",
				model: "AdopterQuestionnaire",
				populate: {
					path: "userId",
					model: "User",
				},
			});

		console.log(likes);

		return {
			likes: likes,
			numOfLikes: likes.length,
		};
	},

	getPetsTrashLikes: async (parent, { userId }) => {
		const likes = await LikeTrash.find({ userId: userId })
			.populate("petId")
			.populate("userId")
			.populate({
				path: "petId",
				model: "AdoptedQuestionnaire",
				populate: {
					path: "userId",
					model: "User",
				},
			});

		return {
			likes: likes,
			numOfLikes: likes.length,
		};
	},

	getUsersTrashLikes: async (parent, { userId }) => {
		const likes = await LikeUserTrash.find({ userId: userId })
			.populate("userId")
			.populate("likedUserId")
			.populate({
				path: "likedUserId",
				model: "AdopterQuestionnaire",
				populate: {
					path: "userId",
					model: "User",
				},
			});

		return {
			likes: likes,
			numOfLikes: likes.length,
		};
	},
};
