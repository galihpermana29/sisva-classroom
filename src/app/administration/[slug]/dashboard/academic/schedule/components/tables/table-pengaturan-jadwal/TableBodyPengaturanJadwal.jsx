"use client";

import { TableBodyLoading, TableEmptyState } from "@/components/CustomTable";
import { formatDayToLabel } from "@/utils/formatDay";
import { Stack, TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Image from "next/image";
import { useGetClassSchedule } from "../../../hooks/useGetClassSchedule";
import { EditJamSekolahModal } from "../../modals/EditJamSekolahModal";
import { DeleteJamSekolahModal } from "../../modals/DeleteJamSekolahModal";

dayjs.extend(customParseFormat);

export const TableBodyPengaturanJadwal = ({ columnCount }) => {
  const { data: rows, isLoading } = useGetClassSchedule();

  if (isLoading) return <TableBodyLoading columnCount={columnCount} />;
  if (!rows) return <NoFilterState columnCount={columnCount} />;

  return rows && rows.length > 0 ? (
    rows.map((row) => (
      <TableRow
        className="even:bg-gray-100/60"
        hover
        key={row.id}
      >
        <TableCell>{formatDayToLabel(row.day)}</TableCell>
        <TableCell>
          {dayjs(row.start_time, "H:mm a Z").format("HH:mm")}
        </TableCell>
        <TableCell>{dayjs(row.end_time, "H:mm a Z").format("HH:mm")}</TableCell>
        <TableCell>
          <Stack
            flexDirection="row"
            maxWidth="fit-content"
            gap={1}
          >
            <EditJamSekolahModal data={row} />
            <DeleteJamSekolahModal />
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
        <Stack
          paddingY={5}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="/images/empty-state.gif"
            alt="Empty Schedule"
            width={200}
            height={137}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
};
