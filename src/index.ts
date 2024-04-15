import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { dataSource } from "./datasource";
import { CountryResolver } from "./resolvers/CountryResolver";

function start() {
  dataSource
    .initialize()
    .then(() => {
      console.log("Connected to the database.");
      return buildSchema({
        resolvers: [CountryResolver],
      });
    })
    .then((schema) => {
      const server = new ApolloServer({ schema });
      return startStandaloneServer(server, {
        listen: { port: 5001 },
      });
    })
    .then(({ url }) => {
      console.log(`🚀 Server ready at: ${url}`);
    })
    .catch((error) => {
      console.error("Error starting the server: ", error);
    });
}

start();
