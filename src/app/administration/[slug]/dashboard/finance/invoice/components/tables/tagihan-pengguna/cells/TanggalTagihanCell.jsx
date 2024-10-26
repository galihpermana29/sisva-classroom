"use client";

import { TableCellLoading } from "@/components/CustomTable";
import { getUserTimezone } from "@/utils/getUserTimezone";
import { TableCell, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useGetBillById } from "../../../../hooks/useGetBillById";

export const TanggalTagihanCell = ({ billId }) => {
  const { data, isLoading, isError } = useGetBillById(billId);
  if (isLoading) return <TableCellLoading />;

  const date = dayjs(data.deadline, "DD/MM/YYYY h:mm A Z");
  const timezone = getUserTimezone();

  return (
    <TableCell>
      <div className="flex flex-col">
        <Typography variant="body2">
          {isError ? "-" : date.format("DD MMM YYYY")}
        </Typography>
        <Typography
          variant="caption"
          color="gray"
        >
          {isError ? null : `${date.format("HH:mm")} ${timezone}`}
        </Typography>
      </div>
    </TableCell>
  );
};
