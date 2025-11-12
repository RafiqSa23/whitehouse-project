export function toWIB(date: Date | string): Date {
  const utcDate = new Date(date);
  // WIB = UTC + 7 hours
  return new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
}

export function formatIndonesianDateTime(date: Date | string): string {
  const wibDate = toWIB(new Date(date));

  return wibDate.toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
}

export function formatRelativeTime(date: Date | string): string {
  const wibDate = toWIB(new Date(date));
  const now = toWIB(new Date());
  const diffInMs = now.getTime() - wibDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "Baru saja";
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
  if (diffInDays === 1) return "Kemarin";
  if (diffInDays < 7) return `${diffInDays} hari yang lalu`;

  return formatIndonesianDateTime(date);
}

export function formatDateForCSV(date: Date | string): string {
  return new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}
