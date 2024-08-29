import { CustomTable } from "@/components/CustomTable";
import { TableBodyTagihan } from "./TableBodyTagihan";
import { tagihanSorts } from "../../../constants";

function TableTagihan() {
  const sortKeys = tagihanSorts.map((sort) => sort.value);
  return (
    <CustomTable
      body={<TableBodyTagihan columnCount={columns.length} />}
      minWidth={1024}
      columns={columns}
      sortKeys={sortKeys}
      id={"tagihan-table"}
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
