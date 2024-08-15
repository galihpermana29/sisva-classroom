import dayjs from "dayjs";

const DEFAULT_FORMAT = "h:mm A Z";

// timeStringToDayjs("7:03 PM +07:00") => dayjs obj
export const timeStringToDayjs = (time) => dayjs(time, DEFAULT_FORMAT);

// example: dayjsToTimeString(obj: dayjs) => "7:03 PM +07:00"
export const dayjsToTimeString = (dayjsObject) =>
  dayjsObject.format(DEFAULT_FORMAT);

// example: timeStringToLocalTimeString("7.03 PM +07:00") => "8.03 PM +08:00" (for user in timezone +08:00)
export const timeStringToLocalTimeString = (time) =>
  dayjs(time, DEFAULT_FORMAT).format(DEFAULT_FORMAT);
