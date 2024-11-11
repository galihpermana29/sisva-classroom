"use client";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";
import { useMounted } from "@mantine/hooks";
import { TableCell, TableRow } from "@mui/material";
import { DEFAULT_ROWS_PER_PAGE } from "../../../constants";
import { useCheckCariFilter } from "../../../hooks/useCheckCariFilter";
import { useCheckKategoriFilter } from "../../../hooks/useCheckKategoriFilter";
import { useCheckStatusFilter } from "../../../hooks/useCheckStatusFilter";
import { useCheckTanggalFilter } from "../../../hooks/useCheckTanggalFilter";
import { useGetAllInvoices } from "../../../hooks/useGetAllInvoices";
import { useGetAllUserBill } from "../../../hooks/useGetAllUserBill";
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
  const { data: rows, isLoading } = useGetAllInvoices({
    paginated: true,
    withSort: true,
  });

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

  return data.map((row) => (
    <TableRowInvoice
      key={row.id}
      id={row.id}
      user_bill_id={row.user_bill_id}
      amount={row.amount}
      status={row.status}
    />
  ));
};

const TableRowInvoice = ({ id, user_bill_id, amount, status }) => {
  const { data: userBills } = useGetAllUserBill({ paginated: false });
  const userBill = userBills
    ? userBills.find((userBill) => userBill.id === user_bill_id)
    : undefined;

  const userId = userBill?.user_id;
  const billId = userBill?.bill_id;

  const cariFilterPass = useCheckCariFilter(userId);
  const kategoriFilterPass = useCheckKategoriFilter(billId);
  const tanggalFilterPass = useCheckTanggalFilter(billId);
  const statusFilterPass = useCheckStatusFilter(id);

  if (
    !cariFilterPass ||
    !tanggalFilterPass ||
    !kategoriFilterPass ||
    !statusFilterPass
  )
    return null;

  return (
    <TableRow hover>
      <IdInvoiceCell id={id} />
      <NamaCell userId={userId} />
      <PembayaranCell billId={billId} />
      <TotalHargaCell billId={billId} />
      <NilaiInvoiceCell amount={amount} />
      <InvoiceStatusCell status={status} />
      <TableCell>
        <InvoiceRowActions id={id} status={status} />
      </TableCell>
    </TableRow>
  );
};
