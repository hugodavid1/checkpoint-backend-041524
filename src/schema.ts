import { buildSchema } from "type-graphql";
import { MyResolver } from "./resolvers/CountryResolver";

export async function schema() {
  const schema = await buildSchema({
    resolvers: [MyResolver],
  });
  return schema;
}
