const dayMap = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

// USAGE:
// Converting from value to label
// formatDay(0, true) => "Senin";
//
// Converting from label to value
// formatDay("Senin") => 0;

export const formatDay = (day, toLabel) => {
  if (toLabel) return dayMap[day];
  return dayMap.findIndex((value) => value === day);
};
