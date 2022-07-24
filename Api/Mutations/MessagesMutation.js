const { PubSub, withFilter } = require("graphql-subscriptions");
const { Message } = require("../../DataBase/Messaje");

const pubsub = new PubSub();

module.exports = {
	sendMessage: async (parent, { body, to, userId }) => {
		if (!body) throw new Error("Mensaje vacio");

		const newMessage = await new Message({
			from: userId,
			to: to,
			body: body,
		}).save();

		pubsub.publish("SHOW_MESSAGES", {
			messages: {
				from: userId,
				to: to,
				body: body,
				id: newMessage.id,
			},
		});

		return {
			from: userId,
			to: to,
			body: body,
			id: newMessage.id,
		};
	},

	messages: {
		subscribe: withFilter(
			() => {
				return pubsub.asyncIterator(["SHOW_MESSAGES"]);
			},
			({ messages }, { userId }) => {
				if (messages.from === userId || messages.to === userId) return true;
				else return false;
			}
		),
	},
};