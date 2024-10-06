"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export async function getTeachingMaterialList(
  classId = "",
  subjectId = "",
  curriculumId = "",
  studyProgramId = ""
) {
  const res = await AppFetchApi(
    `/classroom/v1/teaching_materials?class_id=${classId}&subject_id=${subjectId}&curriculum_id=${curriculumId}&study_program_id=${studyProgramId}`,
    {
      method: "GET",
      headers: {
        "X-Sisva-Source": "tenant.user.test",
      },
    }
  );

  return serverResponseHandler(
    res,
    "Error fetch teaching material list",
    "Success fetch teaching material list"
  );
}

export async function getTeachingMaterialById(id) {
  const res = await AppFetchApi(`/classroom/v1/teaching_materials/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });
  return serverResponseHandler(
    res,
    "Error fetch teaching material",
    "Success fetch teaching material"
  );
}

export async function getAllCurriculum() {
  const res = await AppFetchApi("/academic/v1/curriculums", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error fetch curriculum list",
    "Success fetch curriculum list"
  );
}

export async function getAllStudyProgram() {
  const res = await AppFetchApi("/academic/v1/study-programs", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error fetch study program list",
    "Success fetch study program list"
  );
}

export async function getAllSubjectName() {
  const res = await AppFetchApi("/academic/v1/subjects", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error fetch subject list",
    "Success fetch subject list"
  );
}

export async function getAllTeacher() {
  const res = await AppFetchApi("/user/v1/users?types=teacher", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error fetch teacher list",
    "Success fetch teacher list"
  );
}

export async function postTeachingMaterial(value) {
  const res = await AppFetchApi("/classroom/v1/teaching_materials", {
    method: "POST",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
    body: JSON.stringify(value),
  });
  return serverResponseHandler(
    res,
    "Error create teaching material",
    "Success create teaching material"
  );
}

export async function patchTeachingMaterial(id, value) {
  const res = await AppFetchApi(`/classroom/v1/teaching_materials/${id}`, {
    method: "PATCH",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
    body: JSON.stringify(value),
  });
  return serverResponseHandler(
    res,
    "Error update teaching material",
    "Success update teaching material"
  );
}

export async function deleteTeachingMaterial(id) {
  const res = await AppFetchApi(`/classroom/v1/teaching_materials/${id}`, {
    method: "DELETE",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });
  return serverResponseHandler(
    res,
    "Error delete teaching material",
    "Success delete teaching material"
  );
}

export async function postUploadFile(payload) {
  const res = await AppFetchApi(
    "/file/v1/files/",
    {
      method: "POST",
      headers: {
        "X-Sisva-Source": "test",
      },
      body: payload,
    },
    true
  );

  return serverResponseHandler(res, "Error upload file", "Success upload file");
}
