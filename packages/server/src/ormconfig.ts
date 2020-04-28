import path from "path";

import { Environment } from "./config";

export = {
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, "entity/**/*.{js,ts}")],
  ...{
    [Environment.production]: {
      type: "postgres",
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
      type: "postgres",
      url: "postgres://localhost:5432/bookshelf_development",
      synchronize: true,
      logging: true
    },
    [Environment.test]: {
      type: "sqlite",
      database: ":memory:",
      logging: false
    }
  }[process.env.NODE_ENV || Environment.development]
};
