"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export async function getAttendanceByDate(date) {
  const attendances = await AppFetchApi(
    `/attendance/v1/classes/students?date_id=${date}`,
    {
      method: "GET",
      headers: {
        "X-Sisva-Source": "tenant.user.test",
      },
    }
  );

  return serverResponseHandler(
    attendances,
    "Failed get attendances",
    "Success get attendances"
  );
}
