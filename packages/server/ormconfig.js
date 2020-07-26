const NODE_ENV = process.env.NODE_ENV || "development";

const DEFAULTS = {
  type: "postgres",
  entities: ["src/database/entity/**/*.ts"],
  synchronize: false,
  logging: false,
  cli: {
    entitiesDir: "src/database/entity",
    migrationsDir: "src/database/migrations"
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
    url: "postgres://localhost:5432/bookshelf_development",
    logging: true
  };
}

if (NODE_ENV === "production") {
  module.exports = {
    ...DEFAULTS,
    url: process.env.DATABASE_URL,
    entities: ["dist/src/database/entity/**/*.js"],

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
