import { CustomTable } from "@/components/CustomTable";
import { TableBodyTagihanPengguna } from "./TableBodyTagihanPengguna";

export const TableTagihanPengguna = () => {
  return (
    <CustomTable
      body={<TableBodyTagihanPengguna columnCount={columns.length} />}
      minWidth={1024}
      columns={columns}
    />
  );
};

const columns = [
  "ID Tagihan",
  "Tanggal",
  "Nama",
  "Pembayaran",
  "Total Harga",
  "Jumlah Terbayar",
  "Action",
];
