import { Box, Stack, TableContainer } from "@mui/material";
import { JadwalKelasFilters } from "../filters/jadwal-kelas";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const JadwalKelasSchedule = dynamic(
  () =>
    import("../JadwalKelasSchedule").then(
      ({ JadwalKelasSchedule }) => JadwalKelasSchedule,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[650px] w-full animate-pulse bg-gray-200" />
    ),
  },
);

export const JadwalKelas = () => {
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
          <JadwalKelasFilters />
        </Suspense>
      </Stack>
      <TableContainer>
        <Box minWidth={764}>
          <JadwalKelasSchedule />
        </Box>
      </TableContainer>
    </Stack>
  );
};
