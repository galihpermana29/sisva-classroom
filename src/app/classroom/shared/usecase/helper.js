import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

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
