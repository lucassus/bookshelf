import { formatDateTime } from "./formatDateTime";

test(".formatDateTime", () => {
  expect(formatDateTime(new Date(2020, 9, 13, 12, 45))).toBe(
    "13/10/2020, 12:45"
  );
});
