import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { getTeachingMaterialList } from "../repository/teaching-material-service";
import {
  searchFilter,
  resturctureTeachingMaterialList,
} from "../model/data-mapper";
import { getGradeDropdownById } from "../../class/repository/teacher-class-service";
import { createDropdown } from "../../class/usecase/data-mapper-service";

export const useTeachingMaterial = (initialData) => {
  const [teachingMaterialData, setTeachingMaterialData] = useState(
    initialData.teachingMaterialList
  );
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownData, setDropdownData] = useState({
    curriculumDropdown: initialData.curriculumDropdown,
    studyProgramDropdown: initialData.studyProgramDropdown,
    subjectDropdown: initialData.subjectDropdown,
    gradeDropdown: [],
    teacherDropdown: initialData.teacherDropdown,
  });
  const initialQueryFilter = {
    search: "",
    curriculum: "",
    study_program: "",
    subject: "",
    grade: "",
    teacher: "",
  };

  const [queryFilter, setQueryFilter] = useState(initialQueryFilter);

  const hasActiveFilters = useMemo(
    () => Object.values(queryFilter).some((value) => value !== ""),
    [queryFilter]
  );

  const [debouncedQueryFilter] = useDebounce(queryFilter, 200);

  const fetchTeachingMaterialList = async () => {
    setIsLoading(true);
    const response = await getTeachingMaterialList(
      queryFilter.subject,
      queryFilter.curriculum,
      queryFilter.study_program
    );

    if (response.success) {
      let filteredTeachingMaterialList = response.data;

      if (queryFilter.grade) {
        filteredTeachingMaterialList = filteredTeachingMaterialList.filter(
          (materialItem) => materialItem.grade === queryFilter.grade
        );
      }

      if (queryFilter.teacher) {
        filteredTeachingMaterialList = filteredTeachingMaterialList.filter(
          (materialItem) => materialItem.create_by === queryFilter.teacher
        );
      }

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

  useEffect(() => {
    if (hasActiveFilters) {
      fetchTeachingMaterialList();
    }
  }, [debouncedQueryFilter]);

  const handleResetFilter = () => {
    setQueryFilter(initialQueryFilter);
  };

  const handleStudyProgramFilter = async (e) => {
    const studyProgram = await getGradeDropdownById(e);
    if (studyProgram.success) {
      setDropdownData((prev) => ({
        ...prev,
        gradeDropdown: studyProgram.data?.grades,
      }));
    }

    handleFilterChange("study_program", e);
  };

  const handleFilterChange = useCallback((filterName, value) => {
    setQueryFilter((prevFilter) => ({
      ...prevFilter,
      [filterName]: value,
    }));
  }, []);

  const mappedDropdownData = useMemo(
    () => ({
      curriculumDropdown: createDropdown(
        dropDownData.curriculumDropdown,
        "name",
        "id"
      ),
      studyProgramDropdown: createDropdown(
        dropDownData.studyProgramDropdown,
        "code",
        "id"
      ),
      gradeDropdown: dropDownData.gradeDropdown
        ? createDropdown(dropDownData.gradeDropdown)
        : [],
      subjectDropdown: createDropdown(
        dropDownData.subjectDropdown,
        "name",
        "id"
      ),
      teacherDropdwon: createDropdown(
        dropDownData.teacherDropdown,
        "name",
        "id"
      ),
    }),
    [dropDownData]
  );

  const materialData = useMemo(
    () =>
      hasActiveFilters
        ? resturctureTeachingMaterialList(teachingMaterialData)
        : resturctureTeachingMaterialList(initialData.teachingMaterialList),
    [hasActiveFilters, teachingMaterialData, initialData.teachingMaterialList]
  );

  return {
    isLoading,
    materialData,
    dropDownData: mappedDropdownData,

    handleStudyProgramFilter: handleStudyProgramFilter,
    generalHandleFilter: handleFilterChange,
    queryFilter,
    handleResetFilter,
  };
};
