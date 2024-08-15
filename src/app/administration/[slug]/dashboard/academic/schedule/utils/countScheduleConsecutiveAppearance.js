import { timeStringToLocalTimeString } from "@/utils/formatTimeString";

export const countConsecutiveAppearances = (schedules) => {
  if (!schedules) return;
  // set storing unique key for schedule
  const groupedSchedules = schedules.reduce((acc, schedule) => {
    // convert time to local timestring first
    const startTime = timeStringToLocalTimeString(schedule.start_time);
    const endTime = timeStringToLocalTimeString(schedule.end_time);
    // take name, start time and end time as unique key
    const key = `${schedule.name}-${startTime}-${endTime}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(schedule);
    return acc;
  }, {});

  const result = [];
  for (const key in groupedSchedules) {
    const group = groupedSchedules[key]; // take each schedule
    group.sort((a, b) => a.day - b.day); // sort by day (ascending)

    let consecutiveCount = 1;
    let maxConsecutiveCount = 1;
    let previousDay = group[0].day;

    for (let i = 1; i < group.length; i++) {
      // if consecutive element in a group are consecutive in days
      if (group[i].day === previousDay + 1) {
        consecutiveCount++; // increase the count
      } else {
        consecutiveCount = 1; // else reset
      }
      // take the maximum stored value for max consecutive count
      maxConsecutiveCount = Math.max(maxConsecutiveCount, consecutiveCount);
      // keep track of previous day
      previousDay = group[i].day;
    }

    let finalCount = maxConsecutiveCount;
    // handling base cases
    if (group.length === 1) {
      // case where group match only has one appearance
      group[0].consecutive_appearance = 1;
    } else {
      // else check if the next element in group is consecutive
      if (group[0].day === group[1].day - 1) {
        group[0].consecutive_appearance = group[1].consecutive_appearance;
      }
    }

    for (let i = 1; i < group.length; i++) {
      // assign each schedule consecutive appearance in a new "consecutive_appearance" group
      if (group[i].day !== group[i - 1].day + 1) {
        finalCount = group[i].consecutive_appearance;
      }
      group[i].consecutive_appearance = finalCount;
    }

    result.push(...group);
  }

  return result;
};
