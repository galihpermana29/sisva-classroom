const dayMap = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
  "Minggu",
];

// formatDayToIndex("Senin") => 1
export const formatDayToIndex = (day) =>
  dayMap.findIndex((value) => value === day - 1);

// formatDayToLabel(0) => "Senin"
export const formatDayToLabel = (day) => dayMap[day - 1];
