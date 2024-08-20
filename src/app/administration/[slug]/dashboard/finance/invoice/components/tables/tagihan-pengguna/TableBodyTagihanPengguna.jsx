"use client";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";
import { TableCell, TableRow } from "@mui/material";
import { useGetTagihanPengguna } from "../../../hooks/useGetTagihanPengguna";
import { useMounted } from "@mantine/hooks";
import { usePagination } from "../../../hooks/usePagination";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { DEFAULT_ROWS_PER_PAGE } from "../../../constants";
import { TagihanPenggunaRowActions } from "../../tagihan-pengguna/TagihanPenggunaRowActions";

export const TableBodyTagihanPengguna = ({ columnCount }) => {
  const mounted = useMounted();
  const { data: rows, isLoading } = useGetTagihanPengguna();
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
      <TableRow
        hover
        key={row.id}
      >
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.payment}</TableCell>
        <TableCell>{formatToRupiah(row.total_price)}</TableCell>
        <TableCell>{formatToRupiah(row.total_payment)}</TableCell>
        <TableCell>
          <TagihanPenggunaRowActions id={row.id} />
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableEmptyState columnCount={columnCount} />
  );
};
