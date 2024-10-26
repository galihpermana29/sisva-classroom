import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import {
    getAllTasks,
    getAllTeachingPlan,
} from "../../repository/student-assignment-service";
import { groupTaskByTeachingPlan, searchFilter } from "../data-mapper";

export const useClassAssignment = (classId) => {
  const [filter, setFilter] = useState({
    search: "",
  });
  const [debouncedFilter] = useDebounce(filter, 500);

  const {
    data: assignmentGroups = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["student-class-assignments", classId],
    queryFn: () => getTaskWithGrouping(classId),
    select: (data) => {
      if (!debouncedFilter.search) return data;
      return searchFilter(data, debouncedFilter.search);
    },
    onError: () => "Gagal memuat data.",
    keepPreviousData: true,
  });

  function handleFilterChange(name, value) {
    setFilter({
      ...filter,
      [name]: value,
    });
  }

  return {
    assignmentGroups,
    isLoading,
    error,
    filter,
    handleFilterChange,
    refetch,
  };
};

async function getTaskWithGrouping(classId) {
  try {
    const [taskRes, teachingPlanRes] = await Promise.all([
      getAllTasks(classId),
      getAllTeachingPlan(),
    ]);

    const tasks = taskRes?.data || [];
    const teachingPlans = teachingPlanRes?.data || [];

    const groupedTasks = groupTaskByTeachingPlan(tasks, teachingPlans);

    return groupedTasks;
  } catch (error) {
    console.error("Error fetching tasks or teaching plans:", error);
    throw error;
  }
}
