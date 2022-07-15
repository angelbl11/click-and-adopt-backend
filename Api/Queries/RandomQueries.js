const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");
const { Dislike } = require("../../DataBase/Dislike");
const { DislikeUser } = require("../../DataBase/DisLikeUser");
const { Like } = require("../../DataBase/Like");
const { LikeTrash } = require("../../DataBase/LikeTrash");
const { LikeUser } = require("../../DataBase/LikeUser");
const { LikeUserTrash } = require("../../DataBase/LikeUserTrash");
const { Match } = require("../../DataBase/Match");

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

module.exports = {
	getRandomPet: async (parent, { userId }) => {
		const user = await AdopterQuestionnarie.findOne({ userId: userId });
		const likes = await Like.find({ userId: userId });
		const dislikes = await Dislike.find({ userId: userId });
		const trashLikes = await LikeTrash.find({ userId: userId });
		const matches = await Match.find({ adopterInfo: userId });

		let pets = [];

		for (const pref of user.petPreferences) {
			for (const age of user.petAgePreferences) {
				for (const gender of user.petGenderPreferences) {
					let newPets = await AdoptedQuestionnarie.find({
						ageOfAdoptedPet: age,
						genderOfAdoptedPet: gender,
						typeOfAdoptedPet: pref,
					});

					let check = false;

					newPets.map((item) => {
						likes.map((likesItem) => {
							if (likesItem.petId == item.id) check = true;
						});

						dislikes.map((dislikeItem) => {
							if (dislikeItem.petId == item.id) check = true;
						});

						trashLikes.map((trashItem) => {
							if (trashItem.petId == item.id) check = true;
						});

						matches.map((matchItem) => {
							if (matchItem.petInvolved == item.id) check = true;
						});

						if (!check) pets.push(item);
					});
				}
			}
		}

		pets = shuffle(pets);

		return {
			pets: pets,
			numOfLikes: likes.length,
		};
	},

	getRandomAdopter: async (parent, { userId }) => {
		const user = await AdoptedQuestionnarie.findOne({ userId: userId });
		const likes = await LikeUser.find({ userId: userId }).populate(
			"likedUserId"
		);
		const dislikes = await DislikeUser.find({ userId: userId }).populate(
			"likedUserId"
		);
		const trashLikes = await LikeUserTrash.find({ userId: userId }).populate(
			"likedUserId"
		);
		const matches = await Match.find({ petOwnerInfo: userId });

		const adopters = await AdopterQuestionnarie.find({
			petPreferences: { $in: [user.typeOfAdoptedPet] },
			ageOfAdoptedPet: { $in: [user.petAgePreferences] },
			genderOfAdoptedPet: { $in: [user.petAgePreferences] },
		}).populate("userId");

		let newAdopters = [];

		adopters.map((adopItem) => {
			let flag = false;

			likes.map((item) => {
				if (adopItem.userId.id == item.likedUserId.userId) flag = true;
			});

			dislikes.map((dislikeItem) => {
				if (adopItem.userId.id == dislikeItem.likedUserId.userId) flag = true;
			});

			trashLikes.map((trashItem) => {
				if (adopItem.userId.id == trashItem.likedUserId.userId) flag = true;
			});

			matches.map((matchItem) => {
				if (adopItem.userId.id == matchItem.adopterInfo) flag = true;
			});

			if (!flag) newAdopters.push(adopItem);
		});

		newAdopters = shuffle(newAdopters);

		return { users: newAdopters, numOfLikes: likes.length };
	},
};
