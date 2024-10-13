/**
 * 04/02/2020 00:00 AM +00:00
 * @param {string} dateTime
 * @returns {boolean}
 */
export function isOverdue(task, dateTime) {
  const [datePart, timePart] = dateTime.split(" +")[0].split(" ");

  const fullDateString = `${datePart} ${timePart}`;

  const date = new Date(fullDateString);

  const now = new Date();

  return date < now;
}
