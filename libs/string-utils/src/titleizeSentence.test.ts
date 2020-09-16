import { titleizeSentence } from "./titleizeSentence";

test(".titleizeSentence", () => {
  expect(titleizeSentence("foo bar baz")).toEqual("Foo Bar Baz");
});
