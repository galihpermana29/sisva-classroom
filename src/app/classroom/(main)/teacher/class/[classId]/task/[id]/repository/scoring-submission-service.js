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

export async function getStudentInGroups() {
  const students = await AppFetchApi("/academic/v1/student-groups/students", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    students,
    "Failed get students in group",
    "Success get students in group"
  );
}

export async function getStudentScores(id) {
  const scores = await AppFetchApi(`/classroom/v1/tasks/${id}/scores`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });

  return serverResponseHandler(
    scores,
    "Failed get scores by task id",
    "Success get scores by task id"
  );
}

export async function getUserById(id) {
  const user = await AppFetchApi(`/user/v1/users/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    user,
    "Failed to get user data",
    "Success to get user data"
  );
}

export async function getSubmissionTask(id) {
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
    "Failed get submission by task id",
    "Success get submission by task id"
  );
}

export async function setScoreStudentTask(id, data) {
  const response = await AppFetchApi(`/classroom/v1/tasks/${id}/scores`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });

  return serverResponseHandler(
    response,
    "Failed set score student",
    "Success set score student"
  );
}
