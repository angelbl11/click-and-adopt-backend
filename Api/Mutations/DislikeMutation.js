const { Dislike } = require("../../DataBase/Dislike");
const { DislikeUser } = require("../../DataBase/DisLikeUser");

module.exports = {
	dislikePet: async (parent, { petId, userId }) => {
		const likes = await Dislike.find({ userId: userId });

		if (likes.length > 10) throw new Error("Limite excedido");

		await new Dislike({
			petId: petId,
			userId: userId,
			date: new Date().toLocaleString().replace(/:.. /, " "),
		}).save();

		return "Dislike";
	},

	dislikeUser: async (parent, { userId, likedUserId }) => {
		const likes = await DislikeUser.find({ userId: userId });

		if (likes.length > 10) throw new Error("Limite excedido");

		await new DislikeUser({
			userId: userId,
			likedUserId: likedUserId,
			date: new Date().toLocaleString().replace(/:.. /, " "),
		}).save();

		return "Dislike";
	},
};
