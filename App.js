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
const { CONFIG } = require("./visionClient");
const fs = require("fs");
const vision = require("@google-cloud/vision");
const path = require("path");
const client = new vision.ImageAnnotatorClient(CONFIG);

const image =
  "https://calm-forest-47055.herokuapp.com/ProfilePictures/85339613796214984687434876931536573461292592031.jpg";

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

  app.use(express.static("Images"));

  const PORT = process.env.PORT || 4000;
  httpServer.listen({ port: PORT }, () =>
    console.log(`Server is now running on http://localhost:4000/graphql`)
  );
};

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Set up ready");
    startServer();
    console.log(
      path.join(__dirname, `../../Images/ProfilePictures/${image}` + ".jpg")
    );

    detectFaces(image);
  });

async function detectFaces(inputFile) {
  // Make a call to the Vision API to detect the faces
  const results = await client.faceDetection(inputFile);
  const faces = results[0].faceAnnotations;
  const numFaces = faces.length;
  console.log(`Found ${numFaces} face${numFaces === 1 ? "" : "s"}.`);
  if (numFaces > 0) {
    console.log("si hay una persona");
  } else {
    console.log("no hay una persona");
  }
  return faces;
}
