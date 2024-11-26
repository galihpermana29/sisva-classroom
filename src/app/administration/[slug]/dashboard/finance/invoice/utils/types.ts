export enum InvoiceQueryKey {
  tanggal = "tanggal",
  kategori = "kategori",
  status = "status",
  cari = "cari",
  sort = "sort",
}

export type InvoiceSortKey =
  | "id"
  | "name"
  | "category"
  | "totalPrice"
  | "amount"
  | "status";
