module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "lucassus",
  password: "",
  database: "bookshelf_development",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
};
