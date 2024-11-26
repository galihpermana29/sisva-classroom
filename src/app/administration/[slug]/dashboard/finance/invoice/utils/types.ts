export enum InvoiceQueryKey {
  tanggal = "tanggal",
  kategori = "kategori",
  status = "status",
  cari = "cari",
  sort = "sort",
  rows = "rows",
}

export type InvoiceSortKey =
  | "id"
  | "name"
  | "category"
  | "totalPrice"
  | "amount"
  | "status";
