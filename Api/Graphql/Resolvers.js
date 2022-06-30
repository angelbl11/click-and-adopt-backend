const { GraphQLUpload } = require("graphql-upload");
const LikesQueries = require("../Queries/LikesQueries");
const RandomQueries = require("../Queries/RandomQueries");
const UserQueries = require("../Queries/UserQueries");
const AuthMutation = require("../Mutations/AuthMutation");
const QuestionaireMutation = require("../Mutations/QuestionaireMutations");
const UserMutation = require("../Mutations/UsersMutation");
const LikeMutation = require("../Mutations/LikeMutation");
const DislikeMutation = require("../Mutations/DislikeMutation");

module.exports = {
	resolvers: {
		Upload: GraphQLUpload,

		Query: {
			...UserQueries,
			...RandomQueries,
			...LikesQueries,
		},

		Mutation: {
			...AuthMutation,
			...QuestionaireMutation,
			...UserMutation,
			...LikeMutation,
			...DislikeMutation,
		},
	},
};
