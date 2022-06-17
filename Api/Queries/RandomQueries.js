const { AdoptedQuestionnarie } = require("../../DataBase/AdoptedQuestionnaire");
const { AdopterQuestionnarie } = require("../../DataBase/AdopterQuestionnaire");

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

		let pets = [];

		for (const pref of user.petPreferences) {
			for (const age of user.petAgePreferences) {
				for (const gender of user.petGenderPreferences) {
					let newPets = await AdoptedQuestionnarie.find({
						ageOfAdoptedPet: age,
						genderOfAdoptedPet: gender,
						typeOfAdoptedPet: pref,
					});

					newPets.map((item) => {
						pets.push(item);
					});
				}
			}
		}

		pets = shuffle(pets);

		console.log(pets);

		return pets;
	},
	getRandomAdopter: async (parent, { userId }) => {
		const user = await AdoptedQuestionnarie.findOne({ userId: userId });

		let adopters = { adopterInfo: [], userInfo: {} };

		console.log(user);

		let newAdopters = await AdopterQuestionnarie.find({
			petPreferences: { $in: [user.typeOfAdoptedPet] },
			ageOfAdoptedPet: { $in: [user.petAgePreferences] },
			genderOfAdoptedPet: { $in: [user.petAgePreferences] },
		}).populate("userId");

		adopters = newAdopters;

		adopters = shuffle(adopters);

		console.log(adopters);

		return adopters;
	},
};
