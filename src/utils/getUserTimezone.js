"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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
