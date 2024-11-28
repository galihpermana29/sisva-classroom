"use client";

import { useMounted } from "@mantine/hooks";
import { TableCell, TableRow } from "@mui/material";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";

import { DEFAULT_ROWS_PER_PAGE } from "../../../constants";
import { useCheckCariFilter } from "../../../hooks/useCheckCariFilter";
import { useCheckKategoriFilter } from "../../../hooks/useCheckKategoriFilter";
import { useCheckTanggalFilter } from "../../../hooks/useCheckTanggalFilter";
import { useGetAllUserBill } from "../../../hooks/useGetAllUserBill";
import usePaginatedFilteredUserBills from "../../../hooks/usePaginatedFilteredUserBills";
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
  const { paginatedUserBills: rows, isFetching } =
    usePaginatedFilteredUserBills();

  if (isFetching || !mounted)
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

  return data.map((row) => (
    <TableRow hover key={row.id}>
      <IdTagihanCell billId={row.bill_id} />
      <TanggalTagihanCell billId={row.bill_id} />
      <NamaCell userId={row.user_id} />
      <PembayaranCell billId={row.bill_id} />
      <TotalHargaCell billId={row.bill_id} />
      <JumlahTerbayarCell userId={row.user_id} />
      <TableCell>
        <DeleteTagihanPenggunaModal
          id={row.id}
          billId={row.bill_id}
          userId={row.user_id}
        />
      </TableCell>
    </TableRow>
  ));
};
