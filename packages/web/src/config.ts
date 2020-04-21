export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://graphql-bookshelf.herokuapp.com/graphql"
    : "http://localhost:4000/graphql";
