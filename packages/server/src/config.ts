export enum Environment {
  production = "production",
  development = "development",
  test = "test"
}

export const PORT = process.env.PORT || 4000;

export const ASSETS_BASE_URL =
  process.env.ASSETS_BASE_URL || "http://examples.devmastery.pl/assets";
