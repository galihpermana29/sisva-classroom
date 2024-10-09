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

