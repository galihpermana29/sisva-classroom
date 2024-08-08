import { Box, Stack, TableContainer } from "@mui/material";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { JadwalGuruFilters } from "../filters/jadwal-guru";

const JadwalGuruSchedule = dynamic(
  () =>
    import("../JadwalGuruSchedule").then(
      ({ JadwalGuruSchedule }) => JadwalGuruSchedule
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[650px] w-full animate-pulse bg-gray-200" />
    ),
  }
);

export const JadwalGuru = () => {
  return (
    <Stack paddingTop={3} spacing={3}>
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
      <TableContainer>
        <Box minWidth={764}>
          <JadwalGuruSchedule />
        </Box>
      </TableContainer>
    </Stack>
  );
};
