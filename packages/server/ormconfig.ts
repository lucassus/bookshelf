export = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "lucassus",
  password: "",
  database: "bookshelf_development",
  synchronize: true,
  logging: true,
  cli: {
    entitiesDir: "src/entity"
  }
};
