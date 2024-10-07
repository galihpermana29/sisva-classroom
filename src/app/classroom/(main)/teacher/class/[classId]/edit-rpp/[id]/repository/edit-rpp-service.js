"use server";
import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export async function getRppById(id) {
  const res = await AppFetchApi(`/classroom/v1/teaching_plans/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error fetch rpp by id",
    "Success fetch rpp by id"
  );
}
export async function patchUpdateRpp(id, payload) {
  const res = await AppFetchApi(`/classroom/v1/teaching_plans/${id}`, {
    method: "PATCH",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
    body: JSON.stringify(payload),
  });

  return serverResponseHandler(res, "Error update rpp", "Success update rpp");
}
