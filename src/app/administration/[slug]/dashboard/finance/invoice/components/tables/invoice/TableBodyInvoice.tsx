"use client";

import { useMounted } from "@mantine/hooks";
import { TableCell, TableRow } from "@mui/material";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";

import { DEFAULT_ROWS_PER_PAGE } from "../../../constants";
import { useGetAllUserBill } from "../../../hooks/useGetAllUserBill";
import usePaginatedFilteredInvoices from "../../../hooks/usePaginatedFilteredInvoices";
import { usePagination } from "../../../hooks/usePagination";
import { InvoiceRowActions } from "../../invoice/InvoiceRowActions";
import { IdInvoiceCell } from "./cells/IdInvoiceCell";
import { InvoiceStatusCell } from "./cells/InvoiceStatusCell";
import { NamaCell } from "./cells/NamaCell";
import { NilaiInvoiceCell } from "./cells/NilaiInvoiceCell";
import { PembayaranCell } from "./cells/PembayaranCell";
import { TotalHargaCell } from "./cells/TotalHargaCell";

export const TableBodyInvoice = ({ columnCount }) => {
  const mounted = useMounted();
  const { page } = usePagination();
  const { paginatedInvoices: rows, isFetching: isLoading } =
    usePaginatedFilteredInvoices();

  if (isLoading || !mounted)
    return (
      <TableBodyLoading
        rowCount={DEFAULT_ROWS_PER_PAGE}
        columnCount={columnCount}
      />
    );

  const data = rows[page - 1];

  if (!data || data.length <= 0) {
    return <TableEmptyState columnCount={columnCount} />;
  }

  console.log(data);

  return data.map((row) => (
    <TableRowInvoice
      key={row.id}
      id={row.id}
      user_bill_id={row.user_bill_id}
      amount={row.amount}
      status={row.status}
      row={row}
    />
  ));
};

const TableRowInvoice = ({ id, user_bill_id, amount, status, row }) => {
  const { data: userBills } = useGetAllUserBill({ paginated: false });
  const userBill = userBills
    ? userBills.find((userBill) => userBill.id === user_bill_id)
    : undefined;

  const userId = userBill?.user_id;
  const billId = userBill?.bill_id;

  return (
    <TableRow hover>
      <IdInvoiceCell id={row.id} />
      <NamaCell userId={row.user_bill.user.id} />
      <PembayaranCell billId={row.user_bill.bill.id} />
      <TotalHargaCell billId={row.user_bill.bill.id} />
      <NilaiInvoiceCell amount={row.amount} />
      <InvoiceStatusCell status={row.status} />
      <TableCell>
        <InvoiceRowActions id={row.id} status={row.status} />
      </TableCell>
    </TableRow>
  );
};
