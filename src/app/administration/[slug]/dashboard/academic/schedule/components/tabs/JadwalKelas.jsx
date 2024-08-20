import { Stack, TableContainer } from "@mui/material";
import { JadwalKelasFilters } from "../filters/jadwal-kelas";
import { Suspense } from "react";
import { JadwalKelasSchedule } from "../JadwalKelasSchedule";
import { JadwalKelasFilterAlert } from "../JadwalKelasFilterAlert";

export const JadwalKelas = () => {
  return (
    <Stack
      paddingTop={3}
      spacing={3}
    >
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
