import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

import { useFilterStatus } from "./useFilterStatus";
import { useGetBillById } from "./useGetBillById";

export const useCheckTanggalFilter = (bill_id) => {
  const { tanggal } = useFilterStatus();
  const { data: billData } = useGetBillById(bill_id);

  if (!tanggal) return true;
  if (!billData) return true;
  if (!billData.deadline) return true;

  const [startDate, endDate] = decodeURIComponent(tanggal)
    .split("-")
    .map((tanggal) => dayjs(tanggal, "DD/MM/YYYY"));

  const billDeadline = dayjs(billData.deadline, "DD/MM/YYYY h:mm A Z");

  return (
    billDeadline.isSameOrAfter(startDate, "date") &&
    billDeadline.isSameOrBefore(endDate, "date")
  );
};
