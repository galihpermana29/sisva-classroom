export const searchFilter = (filteredAssignments, searchTerm) => {
  return filteredAssignments.filter((assignment) => {
    return (
      assignment.name.toLowerCase().includes(searchTerm) ||
      assignment.description.toLowerCase().includes(searchTerm)
    );
  });
};
