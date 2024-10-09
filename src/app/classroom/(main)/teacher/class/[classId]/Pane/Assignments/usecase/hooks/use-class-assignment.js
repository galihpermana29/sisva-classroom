import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import { searchFilter } from "../data-mapper-service";
import { getAllTasks } from "../../repository/class-assignment-service";

export const useClassAssignment = (classId) => {
  const [filter, setFilter] = useState({
    search: "",
  });
  const [debouncedFilter] = useDebounce(filter, 500);

  const {
    data: assignments = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["class-assignments ", classId],
    queryFn: () => getAllTasks(classId),
    select: ({ data }) => {
      if (!debouncedFilter.search) return data;
      return searchFilter(data, debouncedFilter.search.toLowerCase());
    },
    onError: () => "Failed to fetch data.",
    keepPreviousData: true,
  });

  function handleFilterChange(name, value) {
    setFilter({
      ...filter,
      [name]: value,
    });
  }

  return {
    assignments,
    isLoading,
    error,
    filter,
    handleFilterChange,
    refetch,
  };
};
