import { normalize } from "./normalize";

test("normalize", () => {
  const rows = [
    { id: 1, name: "foo" },
    { id: 2, name: "bar" }
  ];

  const byId = normalize(rows);

  expect(byId[1]).toEqual(rows[0]);
  expect(byId[2]).toEqual(rows[1]);
});
