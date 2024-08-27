"use client";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useMounted } from "@mantine/hooks";
import { TableCell, TableRow } from "@mui/material";
import { DEFAULT_ROWS_PER_PAGE } from "../../../constants";
import { useGetAllInvoices } from "../../../hooks/useGetAllInvoices";
import { usePagination } from "../../../hooks/usePagination";
import { InvoiceRowActions } from "../../invoice/InvoiceRowActions";
import { InvoiceStatusBadge } from "../../invoice/InvoiceStatusBadge";

export const TableBodyInvoice = ({ columnCount }) => {
  const mounted = useMounted();
  const { data: rows, isLoading } = useGetAllInvoices();
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
        <TableCell>{row.description}</TableCell>
        <TableCell>{formatToRupiah(row.total_price)}</TableCell>
        <TableCell>{formatToRupiah(row.invoice_value)}</TableCell>
        <TableCell>
          <InvoiceStatusBadge>{row.status}</InvoiceStatusBadge>
        </TableCell>
        <TableCell>
          <InvoiceRowActions id={row.id} status={row.status} />
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableEmptyState columnCount={columnCount} />
  );
};
