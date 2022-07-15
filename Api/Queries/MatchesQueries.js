const { Match } = require("../../DataBase/Match");

module.exports = {
	getMatches: async (parent, { userId }) => {
		return await Match.find({
			$or: [{ adopterInfo: userId }, { petOwnerInfo: userId }],
		})
			.populate("adopterInfo")
			.populate("petOwnerInfo")
			.populate("petInvolved");
	},
};
