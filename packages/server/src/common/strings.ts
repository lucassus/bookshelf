export const titleize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();

export const titleizeSentence = (string: string) =>
  string.split(" ").map(titleize).join(" ");
