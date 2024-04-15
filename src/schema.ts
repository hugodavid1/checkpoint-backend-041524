import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/CountryResolver";

export async function schema() {
  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });
  return schema;
}
