/**
 * 00:00 AM +00:00
 * @param {string} time12h
 * @returns {string}
 */
export function convertTime12To24(time12h) {
  const dateString = `1970-01-01 ${time12h}`;
  const date = new Date(dateString);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
