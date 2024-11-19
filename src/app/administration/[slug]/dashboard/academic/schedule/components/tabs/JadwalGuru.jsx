import { Stack, TableContainer } from "@mui/material";
import { Suspense } from "react";
import { JadwalGuruFilters } from "../filters/jadwal-guru";
import { JadwalGuruFilterAlert } from "../JadwalGuruFilterAlert";
import { JadwalGuruSchedule } from "../JadwalGuruSchedule";

export const JadwalGuru = () => {
  return (
    <Stack paddingTop={3} spacing={3} className="thick-scrollbar">
      <Suspense>
        <JadwalGuruFilterAlert />
      </Suspense>
      <Stack
        gap={1}
        paddingX={3}
        flexDirection="row"
        sx={{ overflowX: "auto" }}
        className="no-scrollbar"
      >
        <Suspense>
          <JadwalGuruFilters />
        </Suspense>
      </Stack>
      <TableContainer className="place-content-center">
        <JadwalGuruSchedule />
      </TableContainer>
    </Stack>
  );
};
