import { useForm } from "antd/es/form/Form";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  getGradeDropdownById,
  getStudentGroupList,
} from "../../class/repository/teacher-class-service";
import { createDropdown } from "../../class/usecase/data-mapper-service";
import {
  getAllSubjectName,
  getSubjectById,
  getTeachingMaterialById,
} from "../repository/teaching-material-service";

export const useGetDetailTeachingMaterial = (initialData) => {
  const initialDropdownData = {
    curriculumDropdown: initialData.curriculumDropdown,
    studyProgramDropdown: [],
    subjectDropdown: [],
    gradeDropdown: [],
  };

  const [form] = useForm();
  const [isLoadingGetDetail, setIsLoadingGetDetail] = useState(false);
  const [dropDownData, setDropdownData] = useState(initialDropdownData);

  const classData = useSelector((state) => state.classData.detailClass);

  const handleGetPreFieldTeachingMaterial = async () => {
    setIsLoadingGetDetail(true);

    try {
      const subjectDetail = await getSubjectById(classData.subject_id);
      if (!subjectDetail.success) {
        toast.error("Error getting subject details");
        setIsLoadingGetDetail(false);
        return;
      }

      const studentGroups = await getStudentGroupList("", "", "");
      if (!studentGroups.success) {
        toast.error("Error getting student group list");
        setIsLoadingGetDetail(false);
        return;
      }

      const filterStudentGroupById = studentGroups.data.find(
        (item) => item.id === classData.student_group_id
      );

      handleGetSubjectDropdown(
        subjectDetail.data.curriculum_id,
        filterStudentGroupById.study_program_id
      );
      handleGetStudyProgramDropdown(subjectDetail.data.curriculum_id);
      handleGetGradeDropdown(filterStudentGroupById.study_program_id);

      const prefieldData = {
        curriculum_id: subjectDetail.data.curriculum_id,
        study_program_id: filterStudentGroupById.study_program_id,
        grade: filterStudentGroupById.grade,
        subject_id: subjectDetail.data.id,
      };
      form.setFieldsValue(prefieldData);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoadingGetDetail(false);
    }
  };

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
      handleGetStudyProgramDropdown(response.data.curriculum_id);
      form.setFieldsValue(response.data);
    } else {
      toast.error("Error get teaching material");
    }
    setIsLoadingGetDetail(false);
  };

  const handleChangeCurriculum = (e) => {
    handleGetStudyProgramDropdown(e, "create-new");
    form.setFieldValue("curriculum_id", e);
  };

  const handleChangeStudyProgram = (e) => {
    const curriculumId = form.getFieldValue("curriculum_id");
    handleGetGradeDropdown(e);
    handleGetSubjectDropdown(curriculumId, e);
    form.setFieldValue("study_program_id", e);
  };

  const handleGetStudyProgramDropdown = async (curriculumId, type) => {
    const hasExistingValues = dropDownData.studyProgramDropdown?.length !== 0;
    if (hasExistingValues) {
      const fieldsToReset = ["study_program_id", "grade", "subject_id"];
      fieldsToReset.forEach((field) => form.setFieldValue(field, null));
    }

    const selectedCurriculum = initialData.curriculumDropdown.find(
      (curriculum) => curriculum.id === curriculumId
    );

    const isDataInvalid =
      !selectedCurriculum || !selectedCurriculum.study_programs;
    if (isDataInvalid) {
      setDropdownData((prev) => updateDropdownState(prev, [], type));
      return;
    }

    const filteredStudyPrograms = initialData.studyProgramDropdown.filter(
      (program) =>
        selectedCurriculum.study_programs.some(
          (studyProgram) => studyProgram.id === program.id
        )
    );

    setDropdownData((prev) =>
      updateDropdownState(prev, filteredStudyPrograms, type)
    );
  };

  const updateDropdownState = (prevState, studyPrograms, type) => {
    const baseState = type === "create-new" ? initialDropdownData : prevState;

    return {
      ...baseState,
      studyProgramDropdown: studyPrograms,
    };
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
    handleGetPreFieldTeachingMaterial,
  };
};
