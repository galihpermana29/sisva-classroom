import dayjs from "dayjs";

// timeString format H:mm
export function formatTime(timeString) {
  // Split the input string into hours and minutes
  let [hours, minutes] = timeString.split(":").map(Number);

  // Get the user's local offset in hours
  const userOffsetMinutes = dayjs().utcOffset();
  const userOffsetHours = userOffsetMinutes / 60;

  // Format the user's offset into +HH:MM format
  const userOffsetSign = userOffsetHours >= 0 ? "+" : "-";
  const formattedOffsetHours = Math.abs(userOffsetHours)
    .toString()
    .padStart(2, "0");
  const formattedOffset = `${userOffsetSign}${formattedOffsetHours}:00`;

  // Decrease the hour based on the offset hours
  hours -= userOffsetHours;

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
    .padStart(2, "0")} ${period} ${formattedOffset}`;
}
