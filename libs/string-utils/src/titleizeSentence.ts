import { titleize } from "./titleize";

export const titleizeSentence = (string: string) =>
  string.split(" ").map(titleize).join(" ");
