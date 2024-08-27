export const toggleUniqueIds = (id, setSelect) =>
  setSelect((prev) => {
    const set = new Set(prev);
    if (prev.length > 0) {
      set.has(id) ? set.delete(id) : set.add(id);
      return [...set];
    }

    set.add(id);
    return [...set];
  });
