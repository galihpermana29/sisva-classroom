"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export async function getScoreByTaskId(id) {
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
      "X-Sisva-Source": "test",
    },
  });

  return serverResponseHandler(
    user,
    "Failed get user detail",
    "Success get user detail"
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
