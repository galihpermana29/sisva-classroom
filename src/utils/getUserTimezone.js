"use client";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getUserTimezone = () => {
  const tz = dayjs.tz.guess();
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: tz,
    timeZoneName: "shortGeneric",
  })
    .format(new Date())
    .split(" ")[1];
};
