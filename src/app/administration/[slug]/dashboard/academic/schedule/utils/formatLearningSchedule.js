import { formatToLocaleString } from "./formatToLocaleString";

const LEARNING_SCHEDULE_TYPE = "learning";
const LEARNING_SCHEDULE_COLOR = "#ACDEE7";

export const formatLearningSchedule = (schedules, classes) => {
  if (!schedules) return [];
  return schedules.map((schedule) => {
    // can this be null tho?
    // (2 days later) just realized it can indeed be null
    const scheduleClass = classes
      ? getScheduleClass(schedule, classes)
      : undefined;

    return {
      Id: schedule.id,
      Subject: schedule.subject_name,
      Type: LEARNING_SCHEDULE_TYPE,
      Color: LEARNING_SCHEDULE_COLOR,
      StartTime: formatToLocaleString(schedule.start_time, schedule.day),
      EndTime: formatToLocaleString(schedule.end_time, schedule.day),
      TeacherName: schedule.teacher_name,
      ClassName: scheduleClass?.student_group_name,
    };
  });
};

const getScheduleClass = (schedule, classes) => {
  return classes.find((kelas) => kelas.id === schedule.class_id);
};
