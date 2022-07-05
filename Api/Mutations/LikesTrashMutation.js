const { Like } = require("../../DataBase/Like");
const { LikeTrash } = require("../../DataBase/LikeTrash");
const { LikeUser } = require("../../DataBase/LikeUser");
const { LikeUserTrash } = require("../../DataBase/LikeUserTrash");

module.exports = {
	deleteLike: async (parent, { petId, userId }) => {
		await Like.deleteOne({ userId: userId, petId: petId });

		return "Like borrado";
	},

	trashLike: async (parent, { petId, userId }) => {
		await Like.deleteOne({ userId: userId, petId: petId });

		await new LikeTrash({
			petId: petId,
			userId: userId,
			date: new Date().toLocaleString().replace(/:.. /, " "),
		}).save();

		return "like borrado";
	},

	deleteLikeUser: async (parent, { userId, likedUserId }) => {
		await LikeUser.deleteOne({ userId: userId, likedUserId: likedUserId });

		return "Like borrado";
	},

	trashLikeUser: async (parent, { userId, likedUserId }) => {
		await LikeUser.deleteOne({ userId: userId, likedUserId: likedUserId });

		await new LikeUserTrash({
			userId: userId,
			likedUserId: likedUserId,
			date: new Date().toLocaleString().replace(/:.. /, " "),
		}).save();

		return "Like borrado";
	},
};
