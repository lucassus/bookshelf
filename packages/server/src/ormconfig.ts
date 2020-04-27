import path from "path";

import { Environment } from "./config";

export = {
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, "entity/**/*.{js,ts}")],
  ...{
    [Environment.production]: {
      type: "postgres",
      url: process.env.DATABASE_URL
    },
    [Environment.development]: {
      type: "postgres",
      host: "localhost",
      port: 5432,
      database: "bookshelf_development",
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
