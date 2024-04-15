import { Resolver, Mutation, Arg, Query, ID } from "type-graphql";
import { Country, CountryResponse } from "../entities/Country";

@Resolver()
export class CountryResolver {
  // ----------------------- Mutations -----------------------
  // ---------------------------------------------------------
  /*add a country */
  @Mutation(() => CountryResponse)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode", { nullable: true }) continentCode?: string // in my case continentCode is optional
  ): Promise<CountryResponse> {
    try {
      const country = Country.create({
        code,
        name,
        emoji,
        continentCode,
      });

      await Country.save(country);
      return {
        message: "🎉 Country added successfully!",
        status: true,
      };
    } catch (error) {
      console.error("Error adding country: ", error);
      return {
        message: "🚨 Error adding country!",
        status: false,
      };
    }
  }

  /* update country */
  @Mutation(() => CountryResponse)
  async updateCountry(
    @Arg("id", () => ID) id: number,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("emoji", { nullable: true }) emoji?: string,
    @Arg("continentCode", { nullable: true }) continentCode?: string
  ): Promise<CountryResponse> {
    try {
      const country = await Country.findOneBy({ id });
      if (!country) {
        return {
          message: "Country not found!",
          status: false,
        };
      }

      Object.assign(country, {
        name: name || country.name,
        emoji: emoji || country.emoji,
        continentCode: continentCode || country.continentCode,
      });

      await Country.save(country);

      return {
        message: "🎉 Country updated successfully!",
        status: true,
      };
    } catch (error) {
      return {
        message: "🚨 Error updating country!",
        status: false,
      };
    }
  }

  // ---------------------------------------------------------
  // ----------------------- Query ---------------------------

  // query used to get all countries
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    const countries = Country.find();
    if (!countries) {
      return [];
    }
    return countries;
  }

  // Query used to get a single country by code
  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    const country = Country.findOneBy({ code });
    if (!country) {
      return null;
    }
    return country;
  }

  // Query used to get countries by continent
  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[]> {
    const countries = Country.find({ where: { continentCode } });
    if (!countries) {
      return [];
    }
    return countries;
  }
}
