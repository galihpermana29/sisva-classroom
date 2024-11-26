"use client";
import { Divider, Paper, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useQueryState } from "nuqs";

import { useBills } from "@/hooks/query/finance/useBills";
import { useInvoices } from "@/hooks/query/finance/useInvoices";
import { useUserBills } from "@/hooks/query/finance/useUserBills";
import { useUsers } from "@/hooks/query/user/useUsers";
import type { Bill, User, UserBill } from "@/types/apiTypes";
import type { Invoice as InvoiceType } from "@/types/apiTypes";

import type { InvoiceSortKey } from "../../utils/types";
import { InvoiceQueryKey } from "../../utils/types";
import { InvoiceData } from "../invoice/InvoiceData";
import { InvoicePagination } from "../invoice/InvoicePagination";
import { TableInvoice } from "../tables/invoice";
/** @description Component showing the main content of tagihan pengguna tab */

type UserBillWithMoreData = UserBill & {
  user?: User;
  bill?: Bill;
};

type invoiceWithMoreData = InvoiceType & {
  user_bill?: UserBillWithMoreData;
};

export const Invoice = () => {
  const { data: invoices } = useInvoices();
  const { data: userBills } = useUserBills();
  const { data: bills } = useBills();
  const { data: users } = useUsers();

  const invoicesWithMoreData = invoices.map((invoice: invoiceWithMoreData) => {
    invoice.user_bill = userBills.find(
      (userBill) => userBill.id === invoice.user_bill_id
    );
    const user = users.find((user) => user.id === invoice.user_bill?.user_id);
    const bill = bills.find((bill) => bill.id === invoice.user_bill?.bill_id);
    if (!invoice.user_bill) return invoice;
    invoice.user_bill.user = user;
    invoice.user_bill.bill = bill;
    return invoice;
  });

  const [sort] = useQueryState(InvoiceQueryKey.sort);
  const [kategori] = useQueryState(InvoiceQueryKey.kategori);
  const [tanggal] = useQueryState(InvoiceQueryKey.tanggal);
  const [status] = useQueryState(InvoiceQueryKey.status);
  const [cari] = useQueryState(InvoiceQueryKey.cari);

  const filteredInvoices = invoicesWithMoreData.filter((invoice) => {
    function checkKategori() {
      if (!kategori) return true;
      return invoice.user_bill?.bill_id === Number(kategori);
    }

    function checkStatus() {
      if (!status) return true;
      return invoice.status === status;
    }

    function checkTanggal() {
      if (!tanggal) return true;

      const [startDate, endDate] = decodeURIComponent(tanggal)
        .split("-")
        .map((tanggal) => dayjs(tanggal, "DD/MM/YYYY"));

      const billDeadline = dayjs(
        invoice.user_bill?.bill?.deadline,
        "DD/MM/YYYY h:mm A Z"
      );
      return (
        billDeadline.isSameOrAfter(startDate, "date") &&
        billDeadline.isSameOrBefore(endDate, "date")
      );
    }

    return checkKategori() && checkStatus() && checkTanggal();
  });

  console.log(filteredInvoices);

  return (
    <Stack flexDirection="column" flexGrow={1}>
      <Divider sx={{ display: { xs: "none", lg: "block" } }} />
      <Stack display={{ xs: "none", lg: "flex" }} className="thick-scrollbar">
        <TableInvoice />
      </Stack>
      <Stack display={{ xs: "flex", lg: "none" }} padding={2} flexGrow={1}>
        <InvoiceData />
      </Stack>
      <Stack padding={2} component={Paper} position="sticky" bottom={0}>
        <InvoicePagination />
      </Stack>
    </Stack>
  );
};
