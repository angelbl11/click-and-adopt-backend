const { Like } = require("../../DataBase/Like");
const { LikeTrash } = require("../../DataBase/LikeTrash");
const { LikeUser } = require("../../DataBase/LikeUser");
const { LikeUserTrash } = require("../../DataBase/LikeUserTrash");
const { formatDate } = require("../../dateFormating");
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
			date: formatDate(new Date()),
		}).save();

		return "like borrado";
	},

	reverseTrashLike: async (parent, { petId, userId }) => {
		const numOfLike = await Like.count({ userId: userId });

		if (numOfLike > 9) throw new Error("Limite excedido");

		await LikeTrash.deleteOne({ petId: petId, userId: userId });

		await new Like({
			petId: petId,
			userId: userId,
			date: formatDate(new Date()),
		}).save();

		return "Like";
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
			date: formatDate(new Date()),
		}).save();

		return "Like borrado";
	},

	reverseTrashLikeUser: async (parent, { userId, likedUserId }) => {
		const numOfLikes = await LikeUser.count({
			userId: userId,
			likedUserId: likedUserId,
		});

		if (numOfLikes > 9) throw new Error("Limite excedido");

		await LikeUserTrash.deleteOne({ userId: userId, likedUserId: likedUserId });

		await new LikeUser({
			userId: userId,
			likedUserId: likedUserId,
			date: formatDate(new Date()),
		}).save();

		return "Like";
	},
};
