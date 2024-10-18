import dayjs from "dayjs";
import "dayjs/locale/id";

export function dateTimeFormatter(dateString) {
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

  const [datePart] = dateString.split(" ");

  const [day, month, year] = datePart.split("/");

  return `${parseInt(day)}, ${months[parseInt(month) - 1]} ${year}`;
}

export function formatDateDay(dateString) {
  const date = dayjs(dateString, "YYYYMMDD").locale("id");
  const day = date.format("dddd");
  const fullDate = `${date.format("D")} ${date.format("MMMM")} ${date.format(
    "YYYY"
  )}`;

  return {
    day,
    fullDate,
  };
}
