"use client";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useMounted } from "@mantine/hooks";
import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/id";
import { DEFAULT_ROWS_PER_PAGE } from "../../../constants";
import { useGetTagihan } from "../../../hooks/useGetTagihan";
import { usePagination } from "../../../hooks/usePagination";
import { TagihanRowActions } from "../../tagihan/TagihanRowActions";
import { TagihanStatusBadge } from "../../tagihan/TagihanStatusBadge";
import { useGetAllInvoices } from "../../../hooks/useGetAllInvoices";
import JumlahPembayaranTagihan from "./JumlahPembayaranTagihan";

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale("id");

function formatDate(dateString) {
  const date = dayjs(dateString, "DD/MM/YYYY h:mm A Z");
  return date.format("D, MMM YYYY");
}

function formatTime(dateString) {
  const date = dayjs(dateString, "DD/MM/YYYY h:mm A Z");
  return date.format("HH:mm");
}

export const TableBodyTagihan = ({ columnCount }) => {
  const mounted = useMounted();
  const { data: rows, isLoading } = useGetTagihan();
  const { page } = usePagination();

  if (isLoading || !mounted)
    return (
      <TableBodyLoading
        rowCount={DEFAULT_ROWS_PER_PAGE}
        columnCount={columnCount}
      />
    );

  const data = rows[page - 1];

  return data && data.length > 0 ? (
    data.map((row) => (
      <TableRow hover key={row.id}>
        <TableCell>
          #{Boolean(row.custom_id) ? row.custom_id : row.id}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{formatToRupiah(row.amount)}</TableCell>
        <TableCell>
          <JumlahPembayaranTagihan bill_id={row.id} />
        </TableCell>
        <TableCell>
          <Stack>
            <Typography fontSize={"14px"}>
              {formatDate(row.deadline)}
            </Typography>
            <Typography fontSize={"12px"} color={"#969696"}>
              {formatTime(row.deadline)}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <TagihanStatusBadge>{row.status}</TagihanStatusBadge>
        </TableCell>
        <TableCell>
          <TagihanRowActions id={row.id} status={row.status} data={row} />
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableEmptyState columnCount={columnCount} />
  );
};
