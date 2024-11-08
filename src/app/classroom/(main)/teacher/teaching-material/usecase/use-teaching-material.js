import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  getSubjectById,
  getTeachingMaterialList,
} from "../repository/teaching-material-service";
import {
  searchFilter,
  restructureTeachingMaterialList,
} from "../model/data-mapper";
import {
  getGradeDropdownById,
  getStudentGroupList,
} from "../../class/repository/teacher-class-service";
import { createDropdown } from "../../class/usecase/data-mapper-service";
import { generateRandomString } from "./custom-function";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

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
    tag: "",
  };

  const [queryFilter, setQueryFilter] = useState(initialQueryFilter);

  const hasActiveFilters = useMemo(
    () => Object.values(queryFilter).some((value) => value !== ""),
    [queryFilter]
  );

  const [debouncedQueryFilter] = useDebounce(queryFilter, 200);

  const classData = useSelector((state) => state.classData.detailClass);

  const handleGetPreFieldTeachingMaterial = async () => {
    setIsLoading(true);

    try {
      const subjectDetail = await getSubjectById(classData.subject_id);
      if (!subjectDetail.success) {
        toast.error("Error getting subject details");
        setIsLoading(false);
        return;
      }

      const studentGroups = await getStudentGroupList("", "", "");
      if (!studentGroups.success) {
        toast.error("Error getting student group list");
        setIsLoading(false);
        return;
      }

      const filterStudentGroupById = studentGroups.data.find(
        (item) => item.id === classData.student_group_id
      );

      handleGetGradeDropdown(filterStudentGroupById.study_program_id);

      setQueryFilter((prev) => ({
        ...prev,
        curriculum: subjectDetail.data.curriculum_id,
        study_program: filterStudentGroupById.study_program_id,
        subject: subjectDetail.data.id,
        grade: filterStudentGroupById.grade,
      }));
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTeachingMaterialList = async () => {
    setIsLoading(true);
    const response = await getTeachingMaterialList(
      "",
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

  const handleResetFilter = useCallback(() => {
    setQueryFilter({
      ...initialQueryFilter,
      tag: generateRandomString(),
    });
    setDropdownData((prev) => ({
      ...prev,
      gradeDropdown: [],
    }));
  }, []);

  const handleGetGradeDropdown = async (e) => {
    const response = await getGradeDropdownById(e);
    if (response.success) {
      setDropdownData((prev) => ({
        ...prev,
        gradeDropdown: response.data?.grades,
      }));
    }
  };

  const handleStudyProgramFilter = async (e) => {
    if (dropDownData.gradeDropdown && dropDownData.gradeDropdown.length !== 0) {
      handleFilterChange("grade", "");
    }
    handleGetGradeDropdown(e);
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
        "name",
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
        ? restructureTeachingMaterialList(teachingMaterialData)
        : restructureTeachingMaterialList(initialData.teachingMaterialList),
    [hasActiveFilters, teachingMaterialData, initialData.teachingMaterialList]
  );

  const rawStructureMaterialData = useMemo(
    () =>
      hasActiveFilters
        ? teachingMaterialData
        : initialData.teachingMaterialList,
    [hasActiveFilters, teachingMaterialData, initialData.teachingMaterialList]
  );

  return {
    isLoading,
    materialData,
    rawStructureMaterialData,
    dropDownData: mappedDropdownData,

    handleStudyProgramFilter,
    handleGetGradeDropdown,
    generalHandleFilter: handleFilterChange,
    queryFilter,
    setQueryFilter,
    handleResetFilter,
    handleGetPreFieldTeachingMaterial,
  };
};
