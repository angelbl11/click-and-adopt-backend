const { Like } = require("../../DataBase/Like");
const { LikeUser } = require("../../DataBase/LikeUser");
const { formatDate } = require("../../dateFormating");
const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { Match } = require("../../DataBase/Match");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");

const match = async (adopterInfo, petOwnerInfo, petInvolved) => {
	await new Match({
		adopterInfo: adopterInfo,
		petOwnerInfo: petOwnerInfo,
		petInvolved: petInvolved,
	}).save();
};

module.exports = {
	likePet: async (parent, { petId, userId }) => {
		const likes = await Like.find({ userId: userId });

		likes.map((item) => {
			if (petId == item.petId) throw new Error("Like repetido");
		});

		if (likes.length > 10) throw new Error("Limite excedido");

		const petOwner = await AdoptedQuestionnarie.findById(petId);

		const ownerLikes = await LikeUser.findOne({
			userId: petOwner.userId,
			likedUserId: userId,
		});

		if (ownerLikes) {
			match(userId, petOwner.userId, petId);

			await LikeUser.findOneAndDelete({
				userId: petOwner.userId,
				likedUserId: userId,
			});

			return "Match";
		}

		await new Like({
			petId: petId,
			userId: userId,
			date: formatDate(new Date()),
		}).save();

		return "Like";
	},

	likeUser: async (parent, { userId, likedUserId }) => {
		const likes = await LikeUser.find({ userId: userId });

		likes.map((item) => {
			if (likedUserId == item.likedUserId) throw new Error("Like repetido");
		});

		if (likes.length > 10) throw new Error("Limite excedido");

		const adopterId = await AdopterQuestionnarie.findById(likedUserId);

		const adopterLikes = await Like.find({ userId: adopterId.userId });

		for (const item of adopterLikes) {
			const checkIfMatch = await AdoptedQuestionnarie.findById(item.petId);

			if (checkIfMatch.userId == userId) {
				match(adopterId.userId, userId, item.petId);

				await Like.findOneAndDelete({
					petId: item.petId,
					userId: adopterId.userId,
				});

				return "match";
			}
		}

		await new LikeUser({
			userId: userId,
			likedUserId: likedUserId,
			date: formatDate(new Date()),
		}).save();

		return "like";
	},
};
