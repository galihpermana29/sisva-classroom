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

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Return the formatted time string
  return `${hours}:${minutes
    .toString()
    .padStart(2, "0")} ${period} ${formattedOffset}`;
}
