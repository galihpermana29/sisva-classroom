import { formatToLocaleString } from "./formatToLocaleString";

const LEARNING_SCHEDULE_TYPE = "learning";
const LEARNING_SCHEDULE_COLOR = "#ACDEE7";

export const formatLearningSchedule = (schedules) => {
  if (!schedules) return [];
  return schedules.map((schedule) => ({
    Id: schedule.id,
    Subject: schedule.subject_name,
    Type: LEARNING_SCHEDULE_TYPE,
    Color: LEARNING_SCHEDULE_COLOR,
    StartTime: formatToLocaleString(schedule.start_time, schedule.day),
    EndTime: formatToLocaleString(schedule.end_time, schedule.day),
    TeacherName: schedule.teacher_name,
    ClassName: schedule.class_name,
  }));
};
