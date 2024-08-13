"use client";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";
import { formatDayToLabel } from "@/utils/formatDay";
import { Stack, TableCell, TableRow } from "@mui/material";
import { EditJamSekolahModal } from "../../modals/EditJamSekolahModal";
import { DeleteJamSekolahModal } from "../../modals/DeleteJamSekolahModal";
import { useGetSchoolSchedule } from "../../../hooks/useGetSchoolSchedule";
import { timeStringToDayjs } from "@/utils/formatTimeString";
import { useMounted } from "@mantine/hooks";
import { toTitleCase } from "@/utils/toTitleCase";
import { FilterIncompleteState } from "../../FilterIncompleteState";

export const TableBodyPengaturanJadwal = ({ columnCount }) => {
  const mounted = useMounted();
  const { data: rows, isLoading } = useGetSchoolSchedule();

  if (isLoading || !mounted)
    return <TableBodyLoading columnCount={columnCount} />;
  if (!rows) return <NoFilterState columnCount={columnCount} />;

  return rows && rows.length > 0 ? (
    rows.map((row) => (
      <TableRow
        hover
        key={row.id}
      >
        <TableCell>{formatDayToLabel(row.day)}</TableCell>
        <TableCell>
          {timeStringToDayjs(row.start_time).format("HH:mm")}
        </TableCell>
        <TableCell>{timeStringToDayjs(row.end_time).format("HH:mm")}</TableCell>
        <TableCell>{toTitleCase(statusMap[row.status])}</TableCell>
        <TableCell>
          <Stack
            flexDirection="row"
            maxWidth="fit-content"
            gap={1}
          >
            <EditJamSekolahModal data={row} />
            <DeleteJamSekolahModal data={row} />
          </Stack>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableEmptyState columnCount={columnCount} />
  );
};

const NoFilterState = ({ columnCount }) => {
  return (
    <TableRow>
      <TableCell colSpan={columnCount}>
        <FilterIncompleteState />
      </TableCell>
    </TableRow>
  );
};

const statusMap = {
  active: "Aktif",
  inactive: "Tidak aktif",
  finished: "Selesai",
  trial: "Trial",
};
