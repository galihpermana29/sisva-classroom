export function filterTableListById(lists, ids) {
  if (!ids || !lists) {
    return [];
  }

  const filteredMaterials = lists.filter((item) =>
    ids.some((idObj) => idObj.id == item.id)
  );

  return filteredMaterials;
}
