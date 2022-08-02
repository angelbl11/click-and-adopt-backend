const { PubSub, withFilter } = require("graphql-subscriptions");
const { Message } = require("../../DataBase/Messaje");
const { User } = require("../../DataBase/User");
const { Chat } = require("../../DataBase/Chat");
const pubsub = new PubSub();

module.exports = {
	sendMessage: async (parent, { body, to, userId }) => {
		if (!body) throw new Error("Mensaje vacio");

		const newMessage = await new Message({
			from: userId,
			to: to,
			body: body,
		}).save();

		const newChat = await Chat.findOne({
			$or: [
				{ sender: userId, receiver: to },
				{ sender: to, receiver: userId },
			],
		});

		if (!newChat) {
			new Chat({
				sender: userId,
				receiver: to,
			}).save();

      console.log("chat creado")
		}

		pubsub.publish("SHOW_MESSAGES", {
			messages: {
				from: userId,
				to: to,
				body: body,
				id: newMessage.id,
			},
		});
		const notificationSender = await User.findById(userId);
		const notificationReceiver = await User.findById(to);

		pubsub.publish("SHOW_NOTIFICATIONS", {
			pushNotifications: {
				senderUser: notificationSender,
				receiverUser: notificationReceiver,
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
	pushNotifications: {
		subscribe: withFilter(
			() => {
				return pubsub.asyncIterator(["SHOW_NOTIFICATIONS"]);
			},
			({ pushNotifications }, { userId }) => {
				if (
					pushNotifications.senderUser.id === userId ||
					pushNotifications.receiverUser.id === userId
				)
					return true;
				else return false;
			}
		),
	},
};
