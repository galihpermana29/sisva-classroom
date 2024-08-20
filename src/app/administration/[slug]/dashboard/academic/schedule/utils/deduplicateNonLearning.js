import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

// should be used after formatting, and to deduplicate schedule that appeared more than once
export const deduplicateNonLearning = (schedules) => {
  let seen = new Set();
  return schedules.filter((schedule) => {
    const appearance = schedule.AppearanceCount;
    const name = schedule.Subject;
    // no need to check if it only appeared once
    if (appearance === 1) return true;
    // check if we already seen the same schedule, if yes then remove it as it is a duplicate
    const key = `${name}-${appearance}`;
    return seen.has(key) ? false : seen.add(key);
  });
};
