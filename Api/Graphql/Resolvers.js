const { GraphQLUpload } = require("graphql-upload");
const LikesQueries = require("../Queries/LikesQueries");
const RandomQueries = require("../Queries/RandomQueries");
const UserQueries = require("../Queries/UserQueries");
const AuthMutation = require("../Mutations/AuthMutation");
const QuestionaireMutation = require("../Mutations/QuestionaireMutations");
const UserMutation = require("../Mutations/UsersMutation");
const LikeMutation = require("../Mutations/LikeMutation");
const DislikeMutation = require("../Mutations/DislikeMutation");
const LikesTrashMutation = require("../Mutations/LikesTrashMutation");
const MatchesQueries = require("../Queries/MatchesQueries");
const {messages, sendMessage} = require("../Mutations/MessagesMutation");


module.exports = {
	resolvers: {
		Upload: GraphQLUpload,

		Query: {
			...UserQueries,
			...RandomQueries,
			...LikesQueries,
			...MatchesQueries,
		},

		Mutation: {
			...AuthMutation,
			...QuestionaireMutation,
			...UserMutation,
			...LikeMutation,
			...DislikeMutation,
			...LikesTrashMutation,
			sendMessage
		},

		Subscription: {
			messages
		}
	},
};
