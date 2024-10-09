export function dateFormatterDayName(dateString) {
  const date = new Date(dateString);

  const daysInIndonesian = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const dayName = daysInIndonesian[date.getUTCDay()];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${dayName}, ${day}/${month}/${year}`;
}

export function dateFormatterHours(dateString) {
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

  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/");
  const [time, meridiem] = timePart.split(" ");
  const [hours, minutes] = time.split(":");

  let hour24 = parseInt(hours);
  if (meridiem === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (meridiem === "AM" && hour24 === 12) {
    hour24 = 0;
  }

  const date = new Date(year, month - 1, day, hour24, parseInt(minutes));

  const formattedDay = date.getDate();
  const formattedMonth = months[date.getMonth()];
  const formattedHours = date.getHours().toString().padStart(2, "0");
  const formattedMinutes = date.getMinutes().toString().padStart(2, "0");

  return `${formattedDay} ${formattedMonth}, ${formattedHours}.${formattedMinutes}`;
}
