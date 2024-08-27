import { CustomTable } from "@/components/CustomTable";
import { TableBodyInvoice } from "./TableBodyInvoice";

export const TableInvoice = () => {
  return (
    <CustomTable
      body={<TableBodyInvoice columnCount={columns.length} />}
      minWidth={1024}
      columns={columns}
    />
  );
};

const columns = [
  "ID Invoice",
  "Nama",
  "Pembayaran",
  "Total Harga",
  "Nilai Invoice",
  "Status",
  "Action",
];
