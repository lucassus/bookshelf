import { normalizeValidationErrors } from "./normalizeValidationErrors";

test(".normalizeValidationErrors", () => {
  expect(
    normalizeValidationErrors([
      { path: "password", message: "Invalid password" },
      { path: "email", message: "Invalid email address" }
    ])
  ).toEqual({
    email: "Invalid email address",
    password: "Invalid password"
  });
});
