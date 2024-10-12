"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export async function getStudentGroups() {
  const students = await AppFetchApi(`/academic/v1/student-groups/students`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });
  return serverResponseHandler(
    students,
    "Failed get scores by class id",
    "Success get scores by class id"
  );
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
    "Failed to get all classess ",
    "Success to get all classes"
  );
}

export async function getAllTasks() {
  const tasks = await AppFetchApi("/classroom/v1/tasks", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });

  return serverResponseHandler(
    tasks,
    "Failed to get all classess ",
    "Success to get all classes"
  );
}

export async function getScoreByClassId(id) {
  const scores = await AppFetchApi(
    `/classroom/v1/tasks/scores?class_id=${id}`,
    {
      method: "GET",
      headers: {
        "X-Sisva-Source": "tenant.user.test",
      },
    }
  );
  return serverResponseHandler(
    scores,
    "Failed get scores by class id",
    "Success get scores by class id"
  );
}

export async function getUserById(id) {
  const user = await AppFetchApi(`/user/v1/users/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });
  return serverResponseHandler(
    user,
    "Failed get user by id",
    "Success get user by id"
  );
}

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

export async function updateScore(id, data) {
  const response = await AppFetchApi(`/classroom/v1/tasks/${id}/scores`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });
  return serverResponseHandler(
    response,
    "Failed update score",
    "Success update score"
  );
}
