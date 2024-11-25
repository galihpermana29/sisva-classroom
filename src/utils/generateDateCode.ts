import type { Dayjs } from "dayjs";
export default function generateDateCode(date: Dayjs) {
  return date.toISOString().split("T")[0].split("-").join("");
}
