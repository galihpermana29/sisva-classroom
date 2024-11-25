import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { timeStringToDayjs } from "@/utils/formatTimeString";
dayjs.extend(isoWeek);

export const formatToLocaleString = (timeString, isoWeekday) =>
  timeStringToDayjs(timeString)
    .isoWeekday(isoWeekday)
    .toDate()
    .toLocaleString();
