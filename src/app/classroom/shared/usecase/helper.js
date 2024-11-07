import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id";


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

export function isBefore(date1, date2, format = DEADLINE_FORMAT) {
  const dayjsDate1 = dayjs(date1, format);
  const dayjsDate2 = dayjs(date2, format);
  return dayjs(dayjsDate1).isBefore(dayjs(dayjsDate2));
}

export const DEADLINE_FORMAT = "DD/MM/YYYY h:mm A Z";
export const TIME_FORMAT = "hh:mm";
export const TIME_FORMAT_24 = "HH:mm";

export function generalTimeFormatter(timeString) {
  const time = dayjs(timeString, TIME_FORMAT);

  return time.format(TIME_FORMAT_24);
}

export function getDayName(number) {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  return days[number];
}