const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export function formatDate(date: Date) {
  console.log(date)
  return new Date(date).toLocaleTimeString("es-GB", options);
}
