import { CustomTable } from "@/components/CustomTable";
import { TableBodyTagihanPengguna } from "./TableBodyTagihanPengguna";
import { userBillSorts } from "../../../constants";

export const TableTagihanPengguna = () => {
  const sortKeys = userBillSorts.map((sort) => sort.value);
  return (
    <CustomTable
      body={<TableBodyTagihanPengguna columnCount={columns.length} />}
      minWidth={1024}
      columns={columns}
      sortKeys={sortKeys}
    />
  );
};

const columns = [
  "ID Tagihan",
  "Tenggat Waktu",
  "Nama",
  "Pembayaran",
  "Total Harga",
  "Jumlah Terbayar",
  "Action",
];
