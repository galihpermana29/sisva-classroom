const dayMap = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

// formatDayToIndex("Senin") => 0
export const formatDayToIndex = (day) =>
  dayMap.findIndex((value) => value === day);

// formatDayToLabel(0) => "Senin"
export const formatDayToLabel = (day) => dayMap[day];
