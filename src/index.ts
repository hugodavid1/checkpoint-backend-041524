import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { MyResolver } from "./resolvers/CountryResolver";
import { dataSource } from "./datasource";

function start() {
  dataSource
    .initialize()
    .then(() => {
      console.log("Connected to the database.");
      return buildSchema({
        resolvers: [MyResolver],
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
