import path from "path";

import { ENVIRONMENT, Environment } from "../config";

export = {
  type: "postgres",
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, "entity/**/*.{js,ts}")],
  ...{
    [Environment.production]: {
      url: process.env.DATABASE_URL,

      // TODO: A workaround for heroku and ssl issues,
      //  see https://github.com/typeorm/typeorm/issues/278#issuecomment-614345011
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    },
    [Environment.development]: {
      url: "postgres://localhost:5432/bookshelf_development",
      synchronize: false,
      logging: true
    },
    [Environment.test]: {
      type: "sqlite",
      database: ":memory:",
      logging: false
    }
  }[ENVIRONMENT as Environment]
};
