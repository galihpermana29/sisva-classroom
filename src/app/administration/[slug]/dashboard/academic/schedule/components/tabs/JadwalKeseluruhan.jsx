"use client";

import { Box, Stack, TableContainer } from "@mui/material";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Suspense, useLayoutEffect } from "react";
import { useFilterStatus } from "../../hooks/filters/useFilterStatus";
import { JadwalKeseluruhanFilterAlert } from "../JadwalKeseluruhanFilterAlert";
import JadwalKeseluruhanFilters from "../filters/jadwal-keseluruhan";

const JadwalKeseluruhanSchedule = dynamic(
  () =>
    import("../JadwalKeseluruhanSchedule").then(
      ({ JadwalKeseluruhanSchedule }) => JadwalKeseluruhanSchedule
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[650px] w-full animate-pulse bg-gray-200" />
    ),
  }
);

function JadwalKeseluruhan() {
  const pathName = usePathname();

  const { periode, prodi, tab, isJadwalKeseluruhan } = useFilterStatus();

  useLayoutEffect(() => {
    if (
      Boolean(periode) || Boolean(isJadwalKeseluruhan) ? Boolean(prodi) : false
    ) {
      window.location = `${pathName}?tab=${tab}${
        isJadwalKeseluruhan ? `&jadwal_keseluruhan=${isJadwalKeseluruhan}` : ""
      }`;
    }
  }, []);

  return (
    <Stack paddingY={3} spacing={3}>
      <Suspense>
        <JadwalKeseluruhanFilterAlert />
      </Suspense>
      <Stack
        gap={1}
        paddingX={3}
        flexDirection="row"
        sx={{ overflowX: "auto" }}
        className="no-scrollbar"
      >
        <Suspense>
          <JadwalKeseluruhanFilters />
        </Suspense>
      </Stack>
      <TableContainer>
        <Box minWidth={764}>
          <JadwalKeseluruhanSchedule />
        </Box>
      </TableContainer>
    </Stack>
  );
}

export default JadwalKeseluruhan;
