const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const express = require("express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const mongoose = require("mongoose");
const { graphqlUploadExpress } = require("graphql-upload");

const { DB_URL } = require("./config");
const { typeDefinitions } = require("./Api/Graphql/TypeDefs");
const { resolvers } = require("./Api/Graphql/Resolvers");

const startServer = async () => {
	const app = express();

	const httpServer = createServer(app);

	const schema = makeExecutableSchema({
		typeDefs: typeDefinitions,
		resolvers: resolvers,
	});

	const subscriptionServer = SubscriptionServer.create(
		{ schema: schema, execute, subscribe },
		{ server: httpServer, path: "/graphql" }
	);

	const server = new ApolloServer({
		schema: schema,
		plugins: [
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						},
					};
				},
			},
		],
		context: (req) => req,
	});

	await server.start();

	app.use(graphqlUploadExpress());

	server.applyMiddleware({ app });

	app.use(express.static("public"));

	const PORT = 4000;
	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:4000/graphql`)
	);
};

mongoose
	.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Set up ready");
		startServer();
	});
