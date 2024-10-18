"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export const getAllTasks = async (classId) => {
  try {
    const res = await AppFetchApi(`/classroom/v1/tasks?class_id=${classId}`, {
      method: "GET",
      headers: {
        "X-Sisva-Source": "academic.curriculum.test",
      },
    });

    return serverResponseHandler(
      res,
      "Error fetch tasks",
      "Success fetch tasks"
    );
  } catch (error) {
    throw error;
  }
};

export async function getAllTeachingPlan() {
  try {
    const res = await AppFetchApi(`/classroom/v1/teaching_plans`, {
      method: "GET",
      headers: {
        "X-Sisva-Source": "academic.curriculum.test",
      },
    });

    return serverResponseHandler(
      res,
      "Error fetch teaching plan",
      "Success fetch teaching plan"
    );
  } catch (error) {
    throw error;
  }
}
