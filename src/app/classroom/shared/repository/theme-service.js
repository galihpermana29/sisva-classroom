"use server";
import { AppFetchApi } from "../usecase/global-fetch-api";
import { serverResponseHandler } from "../usecase/server-response-handler";

export async function getSchoolById(id) {
  const school = await AppFetchApi(`/tenant/v1/schools/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "test",
    },
  });

  return serverResponseHandler(
    school,
    "Failed get school detail",
    "Success get school detail"
  );
}
