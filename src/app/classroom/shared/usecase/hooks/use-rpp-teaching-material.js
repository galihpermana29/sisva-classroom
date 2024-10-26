import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import {
    restructTeachingMaterialListRpp,
    searchFilter,
} from '../../../(main)/teacher/teaching-material/model/data-mapper';
import { getTeachingMaterialList } from '../../../(main)/teacher/teaching-material/repository/teaching-material-service';

export const useRppTeachingMaterial = (initialData, type) => {
  const [teachingMaterialData, setTeachingMaterialData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { classId, id } = useParams();

  const initialQueryFilter = {
    search: '',
    curriculum: '',
    study_program: '',
    subject: '',
    tag: '',
  };

  const [queryFilter, setQueryFilter] = useState(initialQueryFilter);

  const [debouncedQueryFilter] = useDebounce(queryFilter, 200);

  const hasActiveFilters = useMemo(
    () => Object.values(queryFilter).some((value) => value !== ''),
    [queryFilter]
  );

  const fetchTeachingMaterialList = async () => {
    setIsLoading(true);
    const response = await getTeachingMaterialList(
      type === 'student' ? id : classId,
      queryFilter.subject,
      queryFilter.curriculum,
      queryFilter.study_program
    );

    if (response.success) {
      let filteredTeachingMaterialList = response.data;

      if (queryFilter.search) {
        const searchTerm = queryFilter.search.toLowerCase();
        filteredTeachingMaterialList = searchFilter(
          filteredTeachingMaterialList,
          searchTerm
        );
      }

      setIsLoading(false);

      setTeachingMaterialData(filteredTeachingMaterialList);
    }
  };

  const handleFilterChange = useCallback((filterName, value) => {
    setQueryFilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: value,
    }));
  }, []);

  useEffect(() => {
    if (hasActiveFilters) {
      fetchTeachingMaterialList();
    }
  }, [debouncedQueryFilter]);

  const materialData = useMemo(
    () =>
      hasActiveFilters
        ? restructTeachingMaterialListRpp(
            initialData.teachingPlanData,
            teachingMaterialData
          )
        : restructTeachingMaterialListRpp(
            initialData.teachingPlanData,
            initialData.teachingMaterialData
          ),
    [hasActiveFilters, teachingMaterialData, initialData.teachingMaterialData]
  );

  return {
    isLoading,
    materialData,
    queryFilter,
    setQueryFilter,
    handleFilterChange,
  };
};
