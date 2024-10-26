import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import {
    getGradeDropdownById,
    getStudentGroupList,
} from "../../repository/teacher-class-service";
import {
    createDropdown,
    getUniqueClasses,
    searchFilter,
} from "../data-mapper-service";

export const useTeacherClass = (initialData) => {
  const [teacherClassData, setTeacherClassData] = useState(initialData);

  const [isLoading, setIsLoading] = useState(false);

  const [dropDownData, setDropdownData] = useState({
    periodData: initialData.periodData,
    studyProgramDropdown: [],
    gradeDropdown: [],
    classroomDropdown: getUniqueClasses(initialData.teacherClass),
  });

  const initialQueryFilter = {
    period: "",
    grade: "",
    study_program: "",
    search: "",
    classroom: "",
  };
  const [queryFilter, setQueryFilter] = useState(initialQueryFilter);

  const hasActiveFilters = useMemo(
    () => Object.values(queryFilter).some((value) => value !== ""),
    [queryFilter]
  );

  const [debouncedQueryFilter] = useDebounce(queryFilter, 200);

  const fetchStudentGroupList = async () => {
    setIsLoading(true);
    const response = await getStudentGroupList(
      queryFilter.period,
      queryFilter.grade,
      queryFilter.study_program
    );
    if (response.success) {
      let filteredClassList = initialData.teacherClass.filter((classItem) =>
        response.data.some(
          (studentGroup) => studentGroup.id === classItem.student_group_id
        )
      );

      if (queryFilter.classroom) {
        filteredClassList = filteredClassList.filter(
          (classItem) => classItem.student_group_name === queryFilter.classroom
        );
      }

      if (queryFilter.search) {
        const searchTerm = queryFilter.search.toLowerCase();
        filteredClassList = searchFilter(filteredClassList, searchTerm);
      }

      setIsLoading(false);
      setTeacherClassData((prev) => ({
        ...prev,
        teacherClass: filteredClassList,
      }));
    }
  };

  useEffect(() => {
    if (hasActiveFilters) {
      fetchStudentGroupList();
    }
  }, [debouncedQueryFilter]);

  const handleResetFilter = () => {
    setQueryFilter(initialQueryFilter);
    setDropdownData((prev) => ({
      ...prev,
      gradeDropdown: [],
      studyProgramDropdown: [],
    }));
  };

  const handlePeriodFilter = (e) => {
    if (
      dropDownData.studyProgramDropdown &&
      dropDownData.studyProgramDropdown.length !== 0
    ) {
      handleFilterChange("study_program", "");
      handleFilterChange("grade", "");
    }

    const filteredPeriodList = teacherClassData.periodData.find(
      (period) => period.id === e
    );

    const filteredStudyProgramList = initialData.studyProgramList.filter(
      (program) =>
        filteredPeriodList?.study_programs.some(
          (idObj) => idObj.id === program.id
        )
    );
    setDropdownData((prev) => ({
      ...prev,
      studyProgramDropdown: filteredStudyProgramList,
    }));

    handleFilterChange("period", e);
  };

  const handleStudyProgramFilter = async (e) => {
    if (dropDownData.gradeDropdown && dropDownData.gradeDropdown.length !== 0) {
      handleFilterChange("grade", "");
    }
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
