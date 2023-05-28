const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";

const DEFAULTS = {
  type: "postgres",
  entities: [path.join(__dirname, "src/infra/database/entity/**/*.ts")],
  synchronize: false,
  logging: false,
  cli: {
    entitiesDir: "src/infra/database/entity",
    migrationsDir: "src/infra/database/migrations"
  }
};

if (NODE_ENV === "test") {
  module.exports = {
    ...DEFAULTS,
    type: "sqlite",
    database: ":memory:",
    synchronize: true
  };
}

if (NODE_ENV === "development") {
  module.exports = {
    ...DEFAULTS,
    url: "postgres://postgres:postgres@localhost:5432/bookshelf_development",
    logging: true
  };
}

if (NODE_ENV === "production") {
  module.exports = {
    ...DEFAULTS,
    url: process.env.DATABASE_URL,
    logging: true,
    entities: [path.join(__dirname, "dist/database/entity/**/*.js")],

    // TODO: A workaround for heroku and ssl issues,
    //  see https://github.com/typeorm/typeorm/issues/278#issuecomment-614345011
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  };
}
