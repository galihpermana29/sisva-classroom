import { Stack, TableContainer } from "@mui/material";
import { Suspense } from "react";
import { JadwalKelasFilters } from "../filters/jadwal-kelas";
import { JadwalKelasFilterAlert } from "../JadwalKelasFilterAlert";
import { JadwalKelasSchedule } from "../JadwalKelasSchedule";

export const JadwalKelas = () => {
  return (
    <Stack paddingTop={3} spacing={3} className="thick-scrollbar">
      <Suspense>
        <JadwalKelasFilterAlert />
      </Suspense>
      <Stack
        gap={1}
        paddingX={3}
        flexDirection="row"
        sx={{ overflowX: "auto" }}
        className="no-scrollbar"
      >
        <Suspense>
          <JadwalKelasFilters />
        </Suspense>
      </Stack>
      <TableContainer className="place-content-center">
        <JadwalKelasSchedule />
      </TableContainer>
    </Stack>
  );
};
