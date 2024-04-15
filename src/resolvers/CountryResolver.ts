import { Resolver, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";

@Resolver()
export class CountryResolver {
  @Mutation(() => Boolean)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string
  ): Promise<boolean> {
    try {
      const country = Country.create({
        code,
        name,
        emoji,
      });

      await Country.save(country);
      return true;
    } catch (error) {
      console.error("Error adding country: ", error);
      return false;
    }
  }
}
