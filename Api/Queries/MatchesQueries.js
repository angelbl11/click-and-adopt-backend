const { Chat } = require("../../DataBase/Chat");
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
	getChatList: async (parent, { userId, partnerId }) => {
		const chatList = await Chat.find({
			$or: [
				{ sender: userId, receiver: partnerId },
				{ sender: partnerId, receiver: userId },
			],
		}).populate("sender").populate("receiver");
		return chatList;
	},
};
