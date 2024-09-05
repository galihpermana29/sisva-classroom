import { formatToLocaleString } from "./formatToLocaleString";

const NON_LEARNING_SCHEDULE_TYPE = "non-learning";
const NON_LEARNING_SCHEDULE_COLOR = "#FFDBCB";

export const formatNonLearningSchedule = (schedules) => {
  if (!schedules) return [];
  return schedules.map((schedule) => ({
    Id: schedule.id,
    Subject: schedule.name,
    Type: NON_LEARNING_SCHEDULE_TYPE,
    Color: NON_LEARNING_SCHEDULE_COLOR,
    AppearanceCount: schedule.consecutive_appearance ?? 1,
    StartTime: formatToLocaleString(schedule.start_time, schedule.day),
    EndTime: formatToLocaleString(schedule.end_time, schedule.day),
  }));
};
