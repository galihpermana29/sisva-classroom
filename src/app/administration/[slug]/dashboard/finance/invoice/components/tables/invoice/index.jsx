import { CustomTable } from "@/components/CustomTable";
import { invoiceSorts } from "../../../constants";
import { TableBodyInvoice } from "./TableBodyInvoice";

export const TableInvoice = () => {
  const sortKeys = invoiceSorts.map((sort) => sort.value);
  return (
    <CustomTable
      body={<TableBodyInvoice columnCount={columns.length} />}
      minWidth={1024}
      columns={columns}
      sortKeys={sortKeys}
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
