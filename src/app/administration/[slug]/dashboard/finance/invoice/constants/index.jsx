import { InvoiceActions } from "../components/invoice/InvoiceActions";
import { InvoiceFilters } from "../components/invoice/InvoiceFilters";
import { InvoiceSearch } from "../components/invoice/InvoiceSearch";
import { Invoice } from "../components/tabs/Invoice";
import Tagihan from "../components/tabs/Tagihan";
import { TagihanPengguna } from "../components/tabs/TagihanPengguna";
import { TagihanActions } from "../components/tagihan/TagihanActions";
import { TagihanFilters } from "../components/tagihan/TagihanFilters";
import { TagihanSearch } from "../components/tagihan/TagihanSearch";
import { TagihanPenggunaActions } from "../components/tagihan-pengguna/TagihanPenggunaActions";
import { TagihanPenggunaFilters } from "../components/tagihan-pengguna/TagihanPenggunaFilters";
import { TagihanPenggunaSearch } from "../components/tagihan-pengguna/TagihanPenggunaSearch";

/** Default active invoice tab */
export const DEFAULT_INVOICE_TAB = 0;
/** The available tabs for invoice page */
export const INVOICE_TABS = [
  {
    title: "Tagihan",
    component: <Tagihan key="tagihan" />,
    actions: <TagihanActions key="tagihan-actions" />,
    search: <TagihanSearch key="tagihan-search" />,
    filters: <TagihanFilters key="tagihan-filters" />,
  },
  {
    title: "Tagihan Pengguna",
    component: <TagihanPengguna key="tagihan-pengguna" />,
    actions: <TagihanPenggunaActions key="tagihan-pengguna-actions" />,
    search: <TagihanPenggunaSearch key="tagihan-pengguna-search" />,
    filters: <TagihanPenggunaFilters key="tagihan-pengguna-filters" />,
  },
  {
    title: "Invoice",
    component: <Invoice key="invoice" />,
    actions: <InvoiceActions key="invoice-actions" />,
    search: <InvoiceSearch key="invoice-search" />,
    filters: <InvoiceFilters key="invoice-filters" />,
  },
];

/** Value for page param name */
export const CURRENT_PAGE_NAME = "page";
/** Value for rows per page filter name */
export const ROWS_PER_PAGE_NAME = "rows";
/** Default page fallback value */
export const DEFAULT_PAGE = 1;
/** Default rows per page fallback value */
export const DEFAULT_ROWS_PER_PAGE = 5;

export const invoiceSorts = [
  {
    label: "ID Invoice",
    value: "id",
  },
  {
    label: "Nama Pengguna",
    value: "name",
  },
  {
    label: "Jenis Pembayaran",
    value: "category",
  },
  {
    label: "Total Harga",
    value: "totalPrice",
  },
  {
    label: "Nilai Invoice",
    value: "amount",
  },
  {
    label: "Status",
    value: "status",
  },
];

export const userBillSorts = [
  { label: "ID Tagihan", value: "id" },
  { label: "Tenggat Waktu", value: "deadline" },
  { label: "Nama Pengguna", value: "name" },
  { label: "Jenis Pembayaran", value: "category" },
  { label: "Total Harga", value: "totalPrice" },
  { label: "Jumlah Terbayar", value: "amountPaid" },
];

export const tagihanSorts = [
  {
    label: "ID Tagihan",
    value: "id",
  },
  {
    label: "Nama Tagihan",
    value: "name",
  },
  {
    label: "Total harga",
    value: "amount",
  },
  {
    label: "Jumlah Pembayaran",
    value: "total_paid",
  },
  {
    label: "Tenggat Waktu",
    value: "deadline",
  },
  {
    label: "Status",
    value: "status",
  },
];
