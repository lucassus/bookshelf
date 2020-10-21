export const GRAPHQL_URI =
  process.env.NODE_ENV === "production"
    ? "https://graphql-bookshelf.herokuapp.com/graphql"
    : "/graphql";

export const GRAPHQL_SUBSCRIPTIONS_URI =
  process.env.NODE_ENV === "production"
    ? "ws://graphql-bookshelf.herokuapp.com/graphql"
    : "ws://localhost:4000/graphql";
