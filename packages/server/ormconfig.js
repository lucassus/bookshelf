module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "lucassus",
  password: "",
  database: "bookshelf_development",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts"],
  cli: {
    entitiesDir: "src/entity"
  }
};
