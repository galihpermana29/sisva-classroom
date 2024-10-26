import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export function dateFormatterDayName(dateString) {
  const date = dayjs.utc(dateString, "DD/MM/YYYY h:mm A Z");

  const daysInIndonesian = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const dayName = daysInIndonesian[date.day()];
  const day = String(date.date()).padStart(2, "0");
  const month = String(date.month() + 1).padStart(2, "0");
  const year = date.year();

  return `${dayName}, ${day}/${month}/${year}`;
}
