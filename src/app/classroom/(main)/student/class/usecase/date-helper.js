/**
 * 04/02/2020 00:00 AM +00:00
 * @param {string} dateTime
 * @returns {boolean}
 */
export function isOverdue(dateTime) {
  const [day, month, yearAndTime] = dateTime.split('/');
  const [year, time] = yearAndTime.split(' ');
  const formatted = `${month}/${day}/${year} ${time}`;
  return new Date(formatted) < new Date();
}
