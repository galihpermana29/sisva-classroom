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

export function parseDateTimeSort(dateString) {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  let [time, period] = timePart.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return new Date(Date.UTC(year, month - 1, day, hours, minutes));
}
