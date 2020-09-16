import { titleize } from "./titleize";

test(".titleize", () => {
  expect(titleize("foo")).toBe("Foo");
  expect(titleize("Bar")).toBe("Bar");
  expect(titleize("BAZ")).toBe("Baz");
});
