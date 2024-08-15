"use client";

import { Stack } from "@mui/material";
import { useFilterStatus } from "../hooks/filters/useFilterStatus";
import { useGetAvailableClassSchedules } from "../hooks/useGetAvailableClassSchedules";
import { FilterIncompleteState } from "./FilterIncompleteState";
import WeekGeneralSchedule from "./schedule/WeekGeneralSchedule";
import { NonLearningCell } from "./schedule/NonLearningCell";
import { KelasLearningCell } from "./schedule/KelasLearningCell";

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
      {shouldRender && (
        <WeekGeneralSchedule
          data={data}
          cellTemplate={getTemplate}
        />
      )}
    </Stack>
  );
};

const getTemplate = (data) => {
  switch (data.Type) {
    case "learning":
      return <KelasLearningCell data={data} />;
    case "non-learning":
      return <NonLearningCell data={data} />;
    default:
      throw new Error("Unrecognized data type");
  }
};
