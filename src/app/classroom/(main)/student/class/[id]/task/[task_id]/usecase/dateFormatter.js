import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

dayjs.tz.setDefault("Asia/Jakarta");

export function dateFormatterDayName(dateString) {
  const date = dayjs.utc(dateString, "DD/MM/YYYY h:mm A Z").tz("Asia/Jakarta");

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

export function dateFormatterHours(dateString) {
  const date = dayjs.utc(dateString, "DD/MM/YYYY h:mm A Z").tz("Asia/Jakarta");

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const formattedDay = date.date();
  const formattedMonth = months[date.month()];
  const formattedHours = date.hour().toString().padStart(2, "0");
  const formattedMinutes = date.minute().toString().padStart(2, "0");

  return `${formattedDay} ${formattedMonth}, ${formattedHours}.${formattedMinutes}`;
}
