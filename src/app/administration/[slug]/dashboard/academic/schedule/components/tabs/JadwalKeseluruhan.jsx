"use client";

import { Box, Stack, TableContainer } from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import JadwalKeseluruhanFilters from "../filters/jadwal-keseluruhan";
import { JadwalKeseluruhanFilterAlert } from "../JadwalKeseluruhanFilterAlert";

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
  return (
    <Stack paddingY={3} spacing={3} className="thick-scrollbar no-y-scrollbar">
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
      <JadwalKeseluruhanSchedule />
    </Stack>
  );
}

export default JadwalKeseluruhan;
