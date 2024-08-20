import { timeStringToDayjs } from "@/utils/formatTimeString";

import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

export const formatToLocaleString = (timeString, isoWeekday) =>
  timeStringToDayjs(timeString)
    .isoWeekday(isoWeekday)
    .toDate()
    .toLocaleString();
