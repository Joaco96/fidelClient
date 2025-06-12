export const ActivityOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export const ProfileOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
};

export const TicketOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

export function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  if (!options.hour && !options.minute)
    return new Date(date).toLocaleString("es-GB", options);
  else {
    return new Date(date).toLocaleTimeString("es-GB", options);
  }
}
