/**
 * 04/02/2020 00:00 AM +00:00
 * @param {string} dateTime
 * @returns {string}
 */
export function convertDateTime12To24(dateTime) {
  const [datePart, timePart] = dateTime.split(" +")[0].split(" ");

  const fullDateString = `${datePart} ${timePart}`;

  const date = new Date(fullDateString);

  const formattedDate = date.toLocaleDateString("en-GB");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${formattedDate} ${hours}:${minutes}`;
}
