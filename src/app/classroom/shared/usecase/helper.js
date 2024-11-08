import dayjs from 'dayjs';
import 'dayjs/locale/id';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export function generalDateParser(dateString) {
  const parsedDate = dayjs(dateString, 'DD/MM/YYYY hh:mm A Z');

  return parsedDate;
}

export function generalDateFormatter(dateString, pattern = DEADLINE_FORMAT) {
  const date = dayjs(dateString, DATE_RESPONSE_FORMAT);

  return date.format(pattern);
}

export function isBefore(date1, date2, format = DATE_RESPONSE_FORMAT) {
  const dayjsDate1 = dayjs(date1, format);
  const dayjsDate2 = dayjs(date2, format);
  return dayjs(dayjsDate1).isBefore(dayjs(dayjsDate2));
}

export const DATE_RESPONSE_FORMAT = 'DD/MM/YYYY h:mm A Z';
export const DEADLINE_FORMAT_24 = 'DD/MM/YYYY HH:mm';
export const DEADLINE_FORMAT = 'DD MMMM YYYY hh:mm A';
export const TIME_FORMAT = 'hh:mm';
export const TIME_FORMAT_24 = 'HH:mm';

export function generalTimeFormatter(timeString) {
  const time = dayjs(timeString, TIME_FORMAT);

  return time.format(TIME_FORMAT_24);
}

export function getDayName(number) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  return days[number];
}
