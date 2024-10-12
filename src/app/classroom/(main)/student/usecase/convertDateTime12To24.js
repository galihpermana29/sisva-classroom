/**
 * 04/02/2020 00:00 AM +00:00
 * @param {string} dateTime
 * @returns {string}
 */
export function convertDateTime12To24(dateTime) {
  const [datePart, timePart, ampm] = dateTime.split(" ");

  const [day, month, year] = datePart.split("/");

  let [hours, minutes] = timePart.split(":");

  if (ampm === "PM" && hours !== "12") {
    hours = (parseInt(hours, 10) + 12).toString();
  } else if (ampm === "AM" && hours === "12") {
    hours = "00";
  }

  hours = hours.padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate} ${formattedTime}`;
}
