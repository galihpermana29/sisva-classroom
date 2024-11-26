import dayjs from "dayjs";
import { sort as fastSort } from "fast-sort";
import Fuse from "fuse.js";
import { useQueryState } from "nuqs";

import { useBills } from "@/hooks/query/finance/useBills";
import { useInvoices } from "@/hooks/query/finance/useInvoices";
import { useUserBills } from "@/hooks/query/finance/useUserBills";
import { useUsers } from "@/hooks/query/user/useUsers";
import type { invoiceWithMoreData } from "@/types/apiTypes";

import { InvoiceQueryKey, InvoiceSortKey } from "../utils/types";

export default function useFilteredInvoices() {
  const { data: invoices, isFetching: isFetching1 } = useInvoices();
  const { data: userBills, isFetching: isFetching2 } = useUserBills();
  const { data: bills, isFetching: isFetching3 } = useBills();
  const { data: users, isFetching: isFetching4 } = useUsers();

  const isFetching = isFetching1 || isFetching2 || isFetching3 || isFetching4;

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

  let filteredInvoices = invoicesWithMoreData.filter((invoice) => {
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

  if (cari) {
    const fuse = new Fuse(filteredInvoices, {
      keys: [
        "user_bill.user.name",
        {
          name: "user_bill.bill.amount",
          getFn: (invoice) => invoice.user_bill.bill.amount.toString(),
        },
        {
          name: "amount",
          getFn: (invoice) => invoice.id.toString(),
        },
      ],
    });
    filteredInvoices = fuse.search(cari).map((data) => data.item);
  }

  if (sort) {
    filteredInvoices = fastSort(filteredInvoices).asc((invoice) => {
      switch (sort as InvoiceSortKey) {
        case "id":
          return invoice.id;
        case "name":
          return invoice.user_bill.user.name;
        case "category":
          return invoice.user_bill.bill.name;
        case "totalPrice":
          return invoice.user_bill.bill.amount;
        case "amount":
          return invoice.amount;
        case "status":
          return invoice.status;
        default:
          return invoice.id;
      }
    });
  }

  return { filteredInvoices, isFetching };
}
