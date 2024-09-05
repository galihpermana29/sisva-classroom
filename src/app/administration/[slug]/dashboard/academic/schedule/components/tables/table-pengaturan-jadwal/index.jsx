import { CustomTable } from "@/components/CustomTable";
import { TableBodyPengaturanJadwal } from "./TableBodyPengaturanJadwal";

const columns = ["Hari", "Jam Mulai", "Jam Selesai", "Status", "Action"];

export const TablePengaturanJadwal = () => {
  return (
    <CustomTable
      columns={columns}
      minWidth={650}
      body={<TableBodyPengaturanJadwal columnCount={columns.length} />}
    />
  );
};
