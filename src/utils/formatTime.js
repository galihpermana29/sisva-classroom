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

  // Convert the hour to 12-hour format
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12; // 12-hour format without leading zero

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Return the formatted time string
  return `${formattedHour}:${minutes
    .toString()
    .padStart(2, "0")} ${period} ${formattedOffset}`;
}
