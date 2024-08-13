"use client";

import { Stack } from "@mui/material";
import { useFilterStatus } from "../hooks/filters/useFilterStatus";
import { FilterIncompleteState } from "./FilterIncompleteState";
import WeekGeneralSchedule from "./WeekGeneralSchedule";
import { useGetAvailableTeacherSchedules } from "../hooks/useGetAvailableTeacherSchedules";

export const JadwalGuruSchedule = () => {
  const { periode, prodi, guru } = useFilterStatus();
  const data = useGetAvailableTeacherSchedules();

  const shouldRender = Boolean(periode && prodi && guru);

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
