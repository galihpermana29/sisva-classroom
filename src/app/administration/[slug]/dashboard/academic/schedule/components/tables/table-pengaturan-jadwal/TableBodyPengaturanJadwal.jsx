"use client";

import { useMounted } from "@mantine/hooks";
import { Stack, TableCell, TableRow } from "@mui/material";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";
import { formatDayToLabel } from "@/utils/formatDay";
import { timeStringToDayjs } from "@/utils/formatTimeString";
import { getUserTimezone } from "@/utils/getUserTimezone";
import { toTitleCase } from "@/utils/toTitleCase";

import { useGetSchoolSchedule } from "../../../hooks/useGetSchoolSchedule";
import { FilterIncompleteState } from "../../FilterIncompleteState";
import { DeleteJamSekolahModal } from "../../modals/DeleteJamSekolahModal";
import { EditJamSekolahModal } from "../../modals/EditJamSekolahModal";

export const TableBodyPengaturanJadwal = ({ columnCount }) => {
  const mounted = useMounted();
  const { data: rows, isLoading } = useGetSchoolSchedule();

  if (isLoading || !mounted)
    return <TableBodyLoading columnCount={columnCount} />;
  if (!rows) return <NoFilterState columnCount={columnCount} />;

  const userTimezone = getUserTimezone();

  return rows && rows.length > 0 ? (
    rows.map((row) => (
      <TableRow hover key={row.id}>
        <TableCell>{formatDayToLabel(row.day)}</TableCell>
        <TableCell>
          {`${timeStringToDayjs(row.start_time).format(
            "HH:mm"
          )} ${userTimezone}`}
        </TableCell>
        <TableCell>{`${timeStringToDayjs(row.end_time).format(
          "HH:mm"
        )} ${userTimezone}`}</TableCell>
        <TableCell>{toTitleCase(statusMap[row.status])}</TableCell>
        <TableCell>
          <Stack flexDirection="row" maxWidth="fit-content" gap={1}>
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
