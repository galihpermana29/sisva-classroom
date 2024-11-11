"use client";

import { Stack } from "@mui/material";
import { useFilterStatus } from "../hooks/filters/useFilterStatus";
import { useGetAvailableTeacherSchedules } from "../hooks/useGetAvailableTeacherSchedules";
import { FilterIncompleteState } from "./FilterIncompleteState";
import { GuruLearningCell } from "./schedule/GuruLearningCell";
import { NonLearningCell } from "./schedule/NonLearningCell";
import WeekGeneralSchedule from "./schedule/WeekGeneralSchedule";

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
      {shouldRender && (
        <WeekGeneralSchedule data={data} cellTemplate={getTemplate} />
      )}
    </Stack>
  );
};

const getTemplate = (data) => {
  switch (data.Type) {
    case "learning":
      return <GuruLearningCell data={data} />;
    case "non-learning":
      return <NonLearningCell data={data} />;
    default:
      throw new Error("Unrecognized data type");
  }
};
