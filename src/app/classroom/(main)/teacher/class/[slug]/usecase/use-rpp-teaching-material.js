import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { getTeachingMaterialList } from "../../../teaching-material/repository/teaching-material-service";
import {
  resturctureTeachingMaterialList,
  searchFilter,
} from "../../../teaching-material/model/data-mapper";
import { useParams } from "next/navigation";

export const useRppTeachingMaterial = () => {
  const [teachingMaterialData, setTeachingMaterialData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getParam = useParams();
  const { slug } = getParam;

  const initialQueryFilter = {
    search: "",
    curriculum: "",
    study_program: "",
    subject: "",
    tag: "",
  };

  const [queryFilter, setQueryFilter] = useState(initialQueryFilter);

  const [debouncedQueryFilter] = useDebounce(queryFilter, 200);

  const fetchTeachingMaterialList = async () => {
    setIsLoading(true);
    const response = await getTeachingMaterialList(
      slug,
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
    fetchTeachingMaterialList();
  }, [debouncedQueryFilter]);

  const materialData = resturctureTeachingMaterialList(teachingMaterialData);

  return {
    isLoading,
    materialData,
    queryFilter,
    setQueryFilter,
    handleFilterChange,
  };
};
