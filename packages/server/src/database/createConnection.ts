import path from "path";
import { createConnection } from "typeorm";

export const createTestConnection = () =>
  createConnection({
    entities: [path.join(__dirname, "entity/**/*.ts")],
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    logging: false
  });

export const createDevelopmentConnection = () =>
  createConnection({
    type: "postgres",
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, "entity/**/*.ts")],
    url: "postgres://localhost:5432/bookshelf_development"
  });

export const createProductionConnection = () =>
  createConnection({
    type: "postgres",
    synchronize: false,
    logging: false,
    entities: [path.join(__dirname, "entity/**/*.js")],
    url: process.env.DATABASE_URL,

    // TODO: A workaround for heroku and ssl issues,
    //  see https://github.com/typeorm/typeorm/issues/278#issuecomment-614345011
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
