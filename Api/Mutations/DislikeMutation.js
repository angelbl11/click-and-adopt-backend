const { Dislike } = require("../../DataBase/Dislike");
const { DislikeUser } = require("../../DataBase/DisLikeUser");

module.exports = {
	dislikePet: async (parent, { petId, userId }) => {
		await new Dislike({
			petId: petId,
			userId: userId,
			date: new Date().toLocaleString().replace(/:.. /, " "),
		}).save();

		return "Dislike";
	},

	dislikeUser: async (parent, { userId, likedUserId }) => {
		await new DislikeUser({
			userId: userId,
			likedUserId: likedUserId,
			date: new Date().toLocaleString().replace(/:.. /, " "),
		}).save();

		return "Dislike";
	},
};
