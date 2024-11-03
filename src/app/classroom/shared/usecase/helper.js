import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export function generalDateParser(dateString) {
  const parsedDate = dayjs(dateString, "DD/MM/YYYY hh:mm A Z");

  return parsedDate;
}

export function generalDateFormatter(dateString) {
  const date = dayjs(dateString, "DD/MM/YYYY h:mm A Z");

  return date.format("DD/MM/YYYY h:mm A");
}

export function generalTimeFormatter(timeString) {
  const time = dayjs(timeString, "hh:mm A");

  return time.format("hh:mm");
}

export function isBefore(date1, date2) {
  return dayjs(date1).isBefore(date2);
}