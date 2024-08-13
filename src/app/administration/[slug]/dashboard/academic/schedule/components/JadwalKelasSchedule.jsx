"use client";

import { Stack } from "@mui/material";
import { useFilterStatus } from "../hooks/filters/useFilterStatus";
import { useGetAvailableClassSchedules } from "../hooks/useGetAvailableClassSchedules";
import { FilterIncompleteState } from "./FilterIncompleteState";
import WeekGeneralSchedule from "./WeekGeneralSchedule";

export const JadwalKelasSchedule = () => {
  const { periode, prodi, tingkat, kelas } = useFilterStatus();
  const data = useGetAvailableClassSchedules();

  const shouldRender = Boolean(periode && prodi && tingkat && kelas);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      minWidth={shouldRender && 1280}
    >
      {!shouldRender && <FilterIncompleteState />}
      {shouldRender && <WeekGeneralSchedule data={data} />}
    </Stack>
  );
};
