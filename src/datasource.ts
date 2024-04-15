import { DataSource } from "typeorm";
import { Country } from "./entities/Country";

// Assurez-vous d'installer le package npm du pilote de base de données que vous utilisez, par exemple `npm install pg` pour PostgreSQL.
export const dataSource = new DataSource({
    type: 'sqlite',
    database: '/home/hugo/Documents/Projects/WILD/checkpoint-backend-15042024/database.db',
    entities: [
      Country,
    ],
    synchronize: true,
    logging: true,
  }
  );