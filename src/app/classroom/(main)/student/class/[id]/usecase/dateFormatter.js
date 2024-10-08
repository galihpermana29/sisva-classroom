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
