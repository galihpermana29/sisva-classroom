import { useMemo, useState } from "react";
import { getGradeDropdownById } from "../../../../repository/teacher-class-service";
import { createDropdown } from "../../../../usecase/data-mapper-service";

export const useGetTeachingMaterialDropdown = (initialData, form) => {
  const [dropDownData, setDropdownData] = useState({
    curriculumDropdown: initialData.curriculumDropdown,
    studyProgramDropdown: initialData.studyProgramDropdown,
    subjectDropdown: [],
    gradeDropdown: [],
  });

  const handleChangeCurriculum = (e) => {
    const studyProgramId = form.getFieldValue("study_program_id");
    handleGetSubjectDropdown(e, studyProgramId);
    form.setFieldValue("curriculum_id", e);
  };

  const handleChangeStudyProgram = (e) => {
    const curriculumId = form.getFieldValue("curriculum_id");
    handleGetGradeDropdown(e);
    handleGetSubjectDropdown(curriculumId, e);
    form.setFieldValue("study_program_id", e);
  };

  const handleGetSubjectDropdown = async (curriculumId, studyProgramId) => {
    if (dropDownData.subjectDropdown.length !== 0) {
      form.setFieldValue("subject_id", null);
    }
    const filteredSubject = initialData.subjectDropdown.filter(
      (item) =>
        item.curriculum_id === curriculumId &&
        item.study_program_id === studyProgramId
    );
    setDropdownData((prev) => ({
      ...prev,
      subjectDropdown: filteredSubject,
    }));
  };

  const handleGetGradeDropdown = async (e) => {
    if (dropDownData.gradeDropdown.length !== 0) {
      form.setFieldValue("grade", null);
    }
    const response = await getGradeDropdownById(e);
    if (response.success) {
      setDropdownData((prev) => ({
        ...prev,
        gradeDropdown: response.data?.grades,
      }));
    }
  };

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
    }),
    [dropDownData]
  );
  return {
    dropDownData: mappedDropdownData,
    handleGetGradeDropdown,
    handleGetSubjectDropdown,
    handleChangeCurriculum,
    handleChangeStudyProgram,
  };
};
