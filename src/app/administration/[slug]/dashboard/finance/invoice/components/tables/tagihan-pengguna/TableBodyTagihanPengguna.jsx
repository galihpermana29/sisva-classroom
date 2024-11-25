"use client";

import { useMounted } from "@mantine/hooks";
import { TableCell, TableRow } from "@mui/material";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";

import { DEFAULT_ROWS_PER_PAGE } from "../../../constants";
import { useCheckCariFilter } from "../../../hooks/useCheckCariFilter";
import { useCheckKategoriFilter } from "../../../hooks/useCheckKategoriFilter";
import { useCheckTanggalFilter } from "../../../hooks/useCheckTanggalFilter";
import { useGetAllUserBill } from "../../../hooks/useGetAllUserBill";
import { usePagination } from "../../../hooks/usePagination";
import { DeleteTagihanPenggunaModal } from "../../modals/tagihan-pengguna/DeleteTagihanPenggunaModal";
import { IdTagihanCell } from "./cells/IdTagihanCell";
import { JumlahTerbayarCell } from "./cells/JumlahTerbayarCell";
import { NamaCell } from "./cells/NamaCell";
import { PembayaranCell } from "./cells/PembayaranCell";
import { TanggalTagihanCell } from "./cells/TanggalTagihanCell";
import { TotalHargaCell } from "./cells/TotalHargaCell";

export const TableBodyTagihanPengguna = ({ columnCount }) => {
  const mounted = useMounted();
  const { page } = usePagination();
  const { data: rows, isLoading } = useGetAllUserBill({
    paginated: true,
    withSort: true,
  });

  if (isLoading || !mounted)
    return (
      <TableBodyLoading
        rowCount={DEFAULT_ROWS_PER_PAGE}
        columnCount={columnCount}
      />
    );

  const data = rows[page - 1];

  if (!data || data.length <= 0) {
    return <TableEmptyState columnCount={columnCount} />;
  }

  return data.map((row) => <TableRowTagihanPengguna key={row.id} {...row} />);
};

const TableRowTagihanPengguna = ({ id, user_id, bill_id }) => {
  const cariFilterPass = useCheckCariFilter(user_id);
  const kategoriFilterPass = useCheckKategoriFilter(bill_id);
  const tanggalFilterPass = useCheckTanggalFilter(bill_id);

  if (!cariFilterPass || !tanggalFilterPass || !kategoriFilterPass) return null;

  return (
    <TableRow hover key={id}>
      <IdTagihanCell billId={bill_id} />
      <TanggalTagihanCell billId={bill_id} />
      <NamaCell userId={user_id} />
      <PembayaranCell billId={bill_id} />
      <TotalHargaCell billId={bill_id} />
      <JumlahTerbayarCell userId={user_id} />
      <TableCell>
        <DeleteTagihanPenggunaModal id={id} billId={bill_id} userId={user_id} />
      </TableCell>
    </TableRow>
  );
};
