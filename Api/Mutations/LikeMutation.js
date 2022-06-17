const { Like } = require("../../DataBase/Like");
const { LikeUser } = require("../../DataBase/LikeUser");

module.exports = {
	likePet: async (parent, { petId, userId }) => {
		const likes = await Like.find({ userId: userId });

		let flag = false;

		likes.map((item) => {
			if (petId == item.petId) {
				console.log("se repite: " + item);
				flag = true;
			}
		});

		if (flag) return "Like repetido";

		if (likes.length > 10) return "Limite excedido";

		await new Like({
			petId: petId,
			userId: userId,
		}).save();

		return "Like";
	},

	likeUser: async (parent, { userId, likedUserId }) => {
		const likes = await LikeUser.find({ userId: userId });

		let flag = false;

		likes.map((item) => {
			if (likedUserId == item.likedUserId) {
				console.log(item.likedUserId);
				flag = true;
			} else {
			}
		});

		if (flag) return "Like repetido";

		if (likes.length > 10) return "Limite excedido";

		await new LikeUser({
			userId: userId,
			likedUserId: likedUserId,
			date: new Date().toLocaleString().replace(/:.. /, " "),
		}).save();

		return "like";
	},
};
