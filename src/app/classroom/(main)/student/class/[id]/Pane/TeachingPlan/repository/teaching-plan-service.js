'use server'

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export const getTeachingPlans = async () => {
  const res = await AppFetchApi("/classroom/v1/teaching_plans", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error fetch teaching plans",
    "Success fetch teaching plans"
  );
};
