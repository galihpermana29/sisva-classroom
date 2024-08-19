"use client";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useMounted } from "@mantine/hooks";
import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DEFAULT_ROWS_PER_PAGE } from "../../../constants";
import { useGetTagihan } from "../../../hooks/useGetTagihan";
import { usePagination } from "../../../hooks/usePagination";
import { TagihanPenggunaRowActions } from "../../tagihan-pengguna/TagihanPenggunaRowActions";
import { TagihanStatusBadge } from "../../tagihan/TagihanStatusBadge";
import { TagihanRowActions } from "../../tagihan/TagihanRowActions";

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
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{formatToRupiah(row.total_price)}</TableCell>
        <TableCell>{row.total_payment}</TableCell>
        <TableCell>
          <Stack>
            <Typography>{dayjs(row.deadline).format("D, MMM YYYY")}</Typography>
            <Typography fontSize={"12px"} color={"#969696"}>
              {dayjs(row.deadline).format("HH:mm")}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <TagihanStatusBadge>{row.status}</TagihanStatusBadge>
        </TableCell>
        <TableCell>
          <TagihanRowActions id={row.id} status={row.status} />
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableEmptyState columnCount={columnCount} />
  );
};
