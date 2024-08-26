import { deduplicateNonLearning } from "./deduplicateNonLearning";
import { formatLearningSchedule } from "./formatLearningSchedule";
import { formatNonLearningSchedule } from "./formatNonLearningSchedule";

export const formatAndCombineSchedule = (
  filteredLearning,
  countedNonLearning,
  classes
) => {
  // format to data shape for scheduler
  const formattedLearning = formatLearningSchedule(filteredLearning, classes);
  const formattedNonLearning = formatNonLearningSchedule(countedNonLearning);
  // deduplicate schedule that appeared more than once in non learning
  const deduplicatedNonLearning = deduplicateNonLearning(formattedNonLearning);

  return formattedLearning.concat(deduplicatedNonLearning);
};
