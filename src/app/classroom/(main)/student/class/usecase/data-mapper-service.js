export const filterJoinedGroups = (studentsInGroups, userId) => {
  return studentsInGroups.filter((group) => group.student_id === userId);
};

export const matchClassesToGroups = (allClasses, joinedGroups) => {
  return allClasses.filter((classItem) =>
    joinedGroups.some(
      (group) => group.student_group_id === classItem.student_group_id
    )
  );
};

export function createDropdown(dataList, name, value) {
  const uniqueItems = Array.from(
    new Set(
      dataList.map((data) =>
        JSON.stringify({
          label: name ? data[name] : data,
          value: value ? data[value] : data,
        })
      )
    )
  ).map((item) => JSON.parse(item));

  return uniqueItems;
}

export const searchFilter = (filteredClassList, searchTerm) => {
  return filteredClassList.filter((classItem) => {
    return (
      classItem.student_group_name.toLowerCase().includes(searchTerm) ||
      classItem.subject_name.toLowerCase().includes(searchTerm) ||
      classItem.teacher_name.toLowerCase().includes(searchTerm)
    );
  });
};
