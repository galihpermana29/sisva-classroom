/**
 * 04/02/2020 00:00 AM +00:00
 * @param {string} dateTime
 * @returns {boolean}
 */

// const dayjs = require('dayjs');
// const utc = require('dayjs/plugin/utc');
// const timezone = require('dayjs/plugin/timezone');

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function isOverdue(dateString) {
  // Parse the original date
  const originalDate = dayjs.utc(dateString, "DD/MM/YYYY h:mm A Z");

  // Convert to GMT+7
  const gmtPlus7Date = originalDate.tz("Asia/Bangkok");

  // Get current time in GMT+7
  const currentGmtPlus7 = dayjs().tz("Asia/Bangkok");

  // Check if the date has passed
  const hasPassed = gmtPlus7Date.isBefore(currentGmtPlus7);

  return hasPassed;
}

export function checkDatePassed(dateTime) {
  console.log(dateTime);
  const [day, month, yearAndTime] = dateTime.split("/");
  const [year, time] = yearAndTime.split(" ");
  const formatted = `${month}/${day}/${year} ${time}`;
  return new Date(formatted) < new Date();
}
