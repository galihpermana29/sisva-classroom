export function formatTime(timeString, offsetHour = "+07:00") {
  // Split the input string into hours and minutes
  let [hours, minutes] = timeString.split(":").map(Number);

  // Decrease the hour by 7
  hours -= 7;

  // Handle negative hours by wrapping around to the previous day
  if (hours < 0) {
    hours += 24;
  }

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12 || 12; // If hours is 0, set it to 12 (midnight or noon)

  // Return the formatted time string
  return `${hours}:${minutes
    .toString()
    .padStart(2, "0")} ${period} ${offsetHour}`;
}
