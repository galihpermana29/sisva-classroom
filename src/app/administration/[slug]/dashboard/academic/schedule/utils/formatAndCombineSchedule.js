import { deduplicateNonLearning } from "./deduplicateNonLearning";
import { formatLearningSchedule } from "./formatLearningSchedule";
import { formatNonLearningSchedule } from "./formatNonLearningSchedule";

export const formatAndCombineSchedule = (
  filteredLearning,
  countedNonLearning,
  classes,
  hideNonLearning = false
) => {
  // format to data shape for scheduler
  const formattedLearning = formatLearningSchedule(filteredLearning, classes);
  const formattedNonLearning = formatNonLearningSchedule(countedNonLearning);
  // deduplicate schedule that appeared more than once in non learning
  const deduplicatedNonLearning = deduplicateNonLearning(formattedNonLearning);

  if (hideNonLearning) return formattedLearning;

  // * IMPORTANT: non learning schedule is broken, see https://github.com/zetvies/sisva-demo/issues/126)
  return formattedLearning.concat(deduplicatedNonLearning);
};
