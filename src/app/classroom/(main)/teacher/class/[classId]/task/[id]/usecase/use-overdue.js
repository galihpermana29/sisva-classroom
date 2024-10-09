function parseDate(dateString) {
  const [datePart, timePart, timezone] = dateString.split(" ");
  const [month, day, year] = datePart.split("/");
  const [time, meridiem] = timePart.split(" ");
  const [hours, minutes] = time.split(":");

  let hour24 = parseInt(hours);
  if (meridiem === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (meridiem === "AM" && hour24 === 12) {
    hour24 = 0;
  }

  return new Date(year, parseInt(month) - 1, day, hour24, parseInt(minutes));
}

export function isOverdue(deadline, submissionTime) {
  const deadlineDate = parseDate(deadline);
  const submissionDate = parseDate(submissionTime);

  return submissionDate > deadlineDate;
}
