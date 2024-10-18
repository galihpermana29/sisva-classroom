import toast from "react-hot-toast";
import { getTeachingMaterialById } from "../repository/teaching-material-service";
import { useMemo, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { createDropdown } from "../../class/usecase/data-mapper-service";
import { getGradeDropdownById } from "../../class/repository/teacher-class-service";

export const useGetDetailTeachingMaterial = (initialData) => {
  const initialDropdownData = {
    curriculumDropdown: initialData.curriculumDropdown,
    studyProgramDropdown: initialData.studyProgramDropdown,
    subjectDropdown: [],
    gradeDropdown: [],
  };

  const [form] = useForm();
  const [isLoadingGetDetail, setIsLoadingGetDetail] = useState(false);
  const [dropDownData, setDropdownData] = useState(initialDropdownData);

  const handleGetDetailTeachingMaterial = async (id) => {
    setIsLoadingGetDetail(true);
    setDropdownData(initialDropdownData);
    const response = await getTeachingMaterialById(id);
    if (response.success) {
      handleGetSubjectDropdown(
        response.data.curriculum_id,
        response.data.study_program_id
      );
      handleGetGradeDropdown(response.data.study_program_id);
      form.setFieldsValue(response.data);
    } else {
      toast.error("Error get teaching material");
    }
    setIsLoadingGetDetail(false);
  };

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
    if (
      dropDownData.subjectDropdown &&
      dropDownData.subjectDropdown.length !== 0
    ) {
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
    if (dropDownData.gradeDropdown && dropDownData.gradeDropdown.length !== 0) {
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
    form,
    isLoadingGetDetail,
    handleGetDetailTeachingMaterial,
    dropDownData: mappedDropdownData,
    handleGetGradeDropdown,
    handleGetSubjectDropdown,
    handleChangeCurriculum,
    handleChangeStudyProgram,
    initialDropdownData,
    setDropdownData,
  };
};
