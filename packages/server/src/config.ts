export enum Environment {
  production = "production",
  development = "development",
  test = "test"
}

export const ENVIRONMENT = process.env.NODE_ENV || Environment.development;

export const PORT = process.env.PORT || 4000;

export const ASSETS_BASE_URL =
  process.env.ASSETS_BASE_URL ||
  "https://res.cloudinary.com/lucassus/image/upload/bookshelf";

export const AUTH_TOKEN_SECRET_KEY = "asdf";

export const AUTH_TOKEN_EXPIRES_IN = "15m";
