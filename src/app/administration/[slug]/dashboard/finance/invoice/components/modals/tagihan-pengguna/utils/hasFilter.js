export const hasFilter = (userFilter) => {
  if (!userFilter) {
    return false;
  }
  const { period, studyProgram, grade, kelas } = userFilter;
  return !!period || !!studyProgram || !!grade || !!kelas;
};
