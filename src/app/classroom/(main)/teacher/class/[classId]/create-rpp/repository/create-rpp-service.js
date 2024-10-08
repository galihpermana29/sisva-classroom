"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export async function postCreateRpp(payload) {
  const res = await AppFetchApi("/classroom/v1/teaching_plans", {
    method: "POST",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
    body: JSON.stringify(payload),
  });

  return serverResponseHandler(res, "Error create rpp", "Success create rpp");
}

export async function deleteRpp(id) {
  const res = await AppFetchApi(`/classroom/v1/teaching_plans/${id}`, {
    method: "DELETE",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });

  return serverResponseHandler(res, "Error delete rpp", "Success delete rpp");
}

export async function postCreateTask(payload) {
  const res = await AppFetchApi("/classroom/v1/tasks", {
    method: "POST",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
    body: JSON.stringify(payload),
  });

  return serverResponseHandler(res, "Error create task", "Success create task");
}

export async function putUpdateTask(id, payload) {
  const res = await AppFetchApi(`/classroom/v1/tasks/${id}`, {
    method: "PUT",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
    body: JSON.stringify(payload),
  });

  return serverResponseHandler(res, "Error update task", "Success update task");
}

export async function getTaskById(id) {
  const res = await AppFetchApi(`/classroom/v1/tasks/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error fetch task by id",
    "Success fetch task by id"
  );
}
