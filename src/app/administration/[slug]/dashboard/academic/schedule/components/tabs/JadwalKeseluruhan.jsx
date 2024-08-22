"use client";

import { Box, Stack, TableContainer } from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { JadwalKeseluruhanFilterAlert } from "../JadwalKeseluruhanFilterAlert";
import JadwalKeseluruhanFilters from "../filters/jadwal-keseluruhan";
import AcademicAPI from "@/api/academic";
import { useSearchParams } from "next/navigation";
import { PERIODE_FIELD_NAME } from "../filters/PeriodeSelect";
import dayjs from "dayjs";

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
  const searchParams = useSearchParams();
  const period = searchParams.get(PERIODE_FIELD_NAME);

  const [data, setData] = useState([]);

  const getNonLearningData = async () => {
    const { data } = await AcademicAPI.getAllNonLearningSchedules({
      period_id: period,
    });

    const res = data.data;

    const newData = res.map(({ start_time, end_time }) => {
      return {
        start_time: dayjs(start_time, "h:mm A Z")
          .set("date", 19)
          .set("month", 7)
          .set("year", 2024)
          .toDate(),
        end_time: dayjs(end_time, "h:mm A Z")
          .set("date", 19)
          .set("month", 7)
          .set("year", 2024)
          .toDate(),
      };
    });

    setData(newData);
  };

  useEffect(() => {
    if (period) getNonLearningData();
  }, [period]);

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
          <JadwalKeseluruhanSchedule data={data} />
        </Box>
      </TableContainer>
    </Stack>
  );
}

export default JadwalKeseluruhan;
