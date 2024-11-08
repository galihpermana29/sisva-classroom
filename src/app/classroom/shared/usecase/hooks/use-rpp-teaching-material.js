import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { getTeachingMaterialList } from "../../../(main)/teacher/teaching-material/repository/teaching-material-service";
import {
  restructTeachingMaterialListRpp,
  searchFilter,
} from "../../../(main)/teacher/teaching-material/model/data-mapper";
import { useParams } from "next/navigation";

const INITIAL_QUERY_FILTER = {
  search: "",
  curriculum: "",
  study_program: "",
  subject: "",
  tag: "",
};

export const useRppTeachingMaterial = (initialData, type) => {
  const [teachingMaterialData, setTeachingMaterialData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryFilter, setQueryFilter] = useState(INITIAL_QUERY_FILTER);
  const { classId, id } = useParams();
  const [debouncedQueryFilter] = useDebounce(queryFilter, 200);

  const hasActiveFilters = useMemo(
    () => Object.values(queryFilter).some((value) => value !== ""),
    [queryFilter]
  );

  const getRequestId = useCallback(
    () => (type === "student" ? id : classId),
    [type, id, classId]
  );

  const handleFilterChange = useCallback((filterName, value) => {
    setQueryFilter((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setQueryFilter(INITIAL_QUERY_FILTER);
    setTeachingMaterialData([]);
  }, []);

  const applySearchFilter = useCallback((data, searchTerm) => {
    if (!searchTerm) return data;
    return searchFilter(data, searchTerm.toLowerCase());
  }, []);

  const fetchTeachingMaterialList = useCallback(async () => {
    setIsLoading(true);
    try {
      const { subject, curriculum, study_program, search } = queryFilter;
      const requestId = getRequestId();

      const response = await getTeachingMaterialList(
        requestId,
        subject,
        curriculum,
        study_program
      );

      if (response.success) {
        const filteredData = applySearchFilter(response.data, search);
        setTeachingMaterialData(filteredData);
      } else {
        console.error("Failed to fetch teaching material list:", response);
        setTeachingMaterialData([]);
      }
    } catch (error) {
      console.error("Error fetching teaching material list:", error);
      setTeachingMaterialData([]);
    } finally {
      setIsLoading(false);
    }
  }, [queryFilter, getRequestId, applySearchFilter]);

  useEffect(() => {
    if (hasActiveFilters) {
      fetchTeachingMaterialList();
    } else {
      setTeachingMaterialData([]);
    }
  }, [debouncedQueryFilter, hasActiveFilters, fetchTeachingMaterialList]);

  const materialData = useMemo(() => {
    const sourceData = hasActiveFilters
      ? teachingMaterialData
      : initialData.teachingMaterialData;
    return restructTeachingMaterialListRpp(
      initialData.teachingPlanData,
      sourceData
    );
  }, [
    hasActiveFilters,
    teachingMaterialData,
    initialData.teachingMaterialData,
    initialData.teachingPlanData,
  ]);

  return {
    isLoading,
    materialData,
    queryFilter,
    handleFilterChange,
    handleResetFilters,
    hasActiveFilters,
  };
};
