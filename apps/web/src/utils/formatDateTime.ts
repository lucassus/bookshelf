const dateTimeFormatter = new Intl.DateTimeFormat("default", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
});

export const formatDateTime = (date: Date) => dateTimeFormatter.format(date);
