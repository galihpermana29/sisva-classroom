import { useDebouncedValue } from "@mantine/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getGradeDropdownById,
  getStudentGroupList,
} from "../../repository/teacher-class-service";
import {
  createDropdown,
  getUniqueClasses,
  searchFilter,
} from "../data-mapper-service";

const createInitialState = (initialData) => ({
  periodData: initialData.periodData,
  studyProgramDropdown: [],
  gradeDropdown: [],
  classroomDropdown: getUniqueClasses(initialData.teacherClass),
});

const INITIAL_QUERY_FILTER = {
  period: "",
  grade: "",
  study_program: "",
  search: "",
  classroom: "",
};

export const useTeacherClass = (initialData) => {
  const [teacherClassData, setTeacherClassData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownData, setDropdownData] = useState(
    createInitialState(initialData)
  );
  const [queryFilter, setQueryFilter] = useState(INITIAL_QUERY_FILTER);
  const [debouncedQueryFilter] = useDebouncedValue(queryFilter, 200);

  const hasActiveFilters = useMemo(
    () => Object.values(queryFilter).some((value) => value !== ""),
    [queryFilter]
  );

  const handleFilterChange = useCallback((filterName, value) => {
    const fieldValue = value !== undefined ? value : "";
    setQueryFilter((prev) => ({
      ...prev,
      [filterName]: fieldValue,
    }));
  }, []);

  const updateDropdownData = useCallback((updates) => {
    setDropdownData((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const fetchStudentGroupList = useCallback(async () => {
    setIsLoading(true);
    try {
      const { period, grade, study_program, classroom, search } = queryFilter;
      const response = await getStudentGroupList(period, grade, study_program);

      if (response.success) {
        let filteredClasses = initialData.teacherClass.filter((classItem) =>
          response.data.some((group) => group.id === classItem.student_group_id)
        );

        if (classroom) {
          filteredClasses = filteredClasses.filter(
            (classItem) => classItem.student_group_name === classroom
          );
        }

        if (search) {
          filteredClasses = searchFilter(filteredClasses, search.toLowerCase());
        }

        setTeacherClassData((prev) => ({
          ...prev,
          teacherClass: filteredClasses,
        }));
      }
    } catch (error) {
      console.error("Error fetching student group list:", error);
    } finally {
      setIsLoading(false);
    }
  }, [queryFilter, initialData.teacherClass]);

  const handleResetFilter = useCallback(() => {
    setQueryFilter(INITIAL_QUERY_FILTER);
    updateDropdownData({
      gradeDropdown: [],
      studyProgramDropdown: [],
    });
  }, [updateDropdownData]);

  const handlePeriodFilter = useCallback(
    (value) => {
      const periodId = value !== undefined ? value : "";

      if (dropDownData.studyProgramDropdown?.length !== 0) {
        ["study_program", "grade"].forEach((filter) =>
          handleFilterChange(filter, "")
        );
      }

      const selectedPeriod = teacherClassData.periodData.find(
        (period) => period.id === periodId
      );

      if (!selectedPeriod?.study_programs) {
        updateDropdownData({ studyProgramDropdown: [] });
        handleFilterChange("period", periodId);
        return;
      }

      const filteredStudyPrograms = initialData.studyProgramList.filter(
        (program) =>
          selectedPeriod.study_programs.some(
            (studyProgram) => studyProgram.id === program.id
          )
      );

      updateDropdownData({ studyProgramDropdown: filteredStudyPrograms });
      handleFilterChange("period", periodId);
    },
    [
      teacherClassData.periodData,
      initialData.studyProgramList,
      dropDownData.studyProgramDropdown,
      handleFilterChange,
      updateDropdownData,
    ]
  );

  const handleStudyProgramFilter = useCallback(
    async (value) => {
      const studyProgramId = value !== undefined ? value : "";

      if (dropDownData.gradeDropdown?.length !== 0) {
        handleFilterChange("grade", "");
      }

      if (studyProgramId) {
        try {
          const response = await getGradeDropdownById(studyProgramId);
          if (response.success) {
            updateDropdownData({ gradeDropdown: response.data?.grades || [] });
          }
        } catch (error) {
          console.error("Error fetching grade dropdown:", error);
          updateDropdownData({ gradeDropdown: [] });
        }
      } else {
        updateDropdownData({ gradeDropdown: [] });
      }

      handleFilterChange("study_program", studyProgramId);
    },
    [dropDownData.gradeDropdown, handleFilterChange, updateDropdownData]
  );

  useEffect(() => {
    if (hasActiveFilters) {
      fetchStudentGroupList();
    }
  }, [debouncedQueryFilter, hasActiveFilters, fetchStudentGroupList]);

  const mappedDropdownData = useMemo(
    () => ({
      periodData: createDropdown(dropDownData.periodData, "name", "id"),
      studyProgramDropdown: createDropdown(
        dropDownData.studyProgramDropdown,
        "name",
        "id"
      ),
      gradeDropdown: createDropdown(dropDownData.gradeDropdown),
      classroomDropdown: createDropdown(
        dropDownData.classroomDropdown,
        "student_group_name",
        "student_group_name"
      ),
    }),
    [dropDownData]
  );

  const dropDownMappedHandler = useMemo(
    () => ({
      handlePeriodFilter,
      handleStudyProgramFilter,
    }),
    [handlePeriodFilter, handleStudyProgramFilter]
  );

  const classData = useMemo(
    () =>
      hasActiveFilters
        ? teacherClassData.teacherClass
        : initialData.teacherClass,
    [hasActiveFilters, teacherClassData.teacherClass, initialData.teacherClass]
  );

  return {
    isLoading,
    classData,
    dropDownData: mappedDropdownData,
    dropdownHandler: dropDownMappedHandler,
    generalHandleFilter: handleFilterChange,
    queryFilter,
    handleResetFilter,
  };
};
