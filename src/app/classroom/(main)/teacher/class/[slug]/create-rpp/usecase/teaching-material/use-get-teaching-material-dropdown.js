import { useMemo, useState } from "react";
import { getGradeDropdownById } from "../../../../repository/teacher-class-service";
import { createDropdown } from "../../../../usecase/data-mapper-service";

export const useGetTeachingMaterialDropdown = (initialData) => {
  const [dropDownData, setDropdownData] = useState({
    curriculumDropdown: initialData.curriculumDropdown,
    studyProgramDropdown: initialData.studyProgramDropdown,
    subjectDropdown: initialData.subjectDropdown,
    gradeDropdown: [],
  });

  const handleGetGradeDropdown = async (e) => {
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
    }),
    [dropDownData]
  );
  return {
    dropDownData: mappedDropdownData,
    handleGetGradeDropdown,
  };
};
