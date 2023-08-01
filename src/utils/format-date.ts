export function formatDate(locale: string, date: Date) {
  const formatter = Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formatter.format(date);
}
