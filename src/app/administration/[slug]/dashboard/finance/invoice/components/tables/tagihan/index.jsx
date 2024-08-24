import { CustomTable } from "@/components/CustomTable";
import { TableBodyTagihan } from "./TableBodyTagihan";

function TableTagihan() {
  return (
    <CustomTable
      body={<TableBodyTagihan columnCount={columns.length} />}
      minWidth={1024}
      columns={columns}
    />
  );
}

export default TableTagihan;

const columns = [
  "ID Tagihan",
  "Nama Tagihan",
  "Total Harga",
  "Jumlah Pembayaran",
  "Tenggat Waktu",
  "Status",
  "Action",
];
