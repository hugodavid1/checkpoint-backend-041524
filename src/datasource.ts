import { DataSource } from "typeorm";
import { Country } from "./entities/Country";

export const dataSource = new DataSource({
  type: "sqlite",
  database:
    "/home/hugo/Documents/Projects/WILD/checkpoint-backend-15042024/database.db",
  entities: [Country],
  synchronize: true,
  logging: true,
});
