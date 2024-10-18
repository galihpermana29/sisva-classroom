"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export async function getTaskById(id) {
  const task = await AppFetchApi(`/classroom/v1/tasks/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });
  return serverResponseHandler(
    task,
    "Failed get task by id",
    "Success get task by id"
  );
}

export async function getStudentGroups() {
  const students = await AppFetchApi("/academic/v1/student-groups/students", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });
  return serverResponseHandler(
    students,
    "Failed get student groups",
    "Success get student groups"
  );
}

export async function getSubmissionByTaskId(id) {
  const submission = await AppFetchApi(
    `/classroom/v1/tasks/${id}/submissions`,
    {
      method: "GET",
      headers: {
        "X-Sisva-Source": "tenant.user.test",
      },
    }
  );
  return serverResponseHandler(
    submission,
    "Failed get submission",
    "Success get submission"
  );
}

export async function getScoreByTaskId(id) {
  const score = await AppFetchApi(`/classroom/v1/tasks/${id}/scores`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });
  return serverResponseHandler(score, "Failed get score", "Success get score");
}

export async function getAllClasses() {
  const classes = await AppFetchApi("/academic/v1/classes", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });
  return serverResponseHandler(
    classes,
    "Failed get all classes",
    "Success get all classes"
  );
}

export async function uploadFile(payload) {
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

export async function setSubmissionTask(data, id) {
  const res = await AppFetchApi(
    `/classroom/v1/tasks/${id}/submissions`,
    {
      method: "PUT",
      headers: {
        "X-Sisva-Source": "tenant.user.test",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
    true
  );
  return serverResponseHandler(
    res,
    "Error upload your submission",
    "Success /classroom/v1/tasks/7/submissions"
  );
}
