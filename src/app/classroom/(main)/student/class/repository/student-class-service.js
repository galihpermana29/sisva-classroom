"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export const getAllClasses = async () => {
  try {
    const res = await AppFetchApi("/academic/v1/classes", {
      method: "GET",
      headers: { "X-Sisva-Source": "academic.curriculum.test" },
    });

    return serverResponseHandler(
      res,
      "Error get all classes",
      "Success get all classes"
    );
  } catch (error) {
    throw error;
  }
};

export const getAllStudentsInStudentGroups = async () => {
  try {
    const res = await AppFetchApi("/academic/v1/student-groups/students", {
      method: "GET",
      headers: { "X-Sisva-Source": "academic.curriculum.test" },
    });

    return serverResponseHandler(
      res,
      "Error get all students in student groups",
      "Success get all students in student groups"
    );
  } catch (error) {
    throw error;
  }
};

export const getAllTaskByClassId = async (classId) => {
  try {
    const res = await AppFetchApi(`/classroom/v1/tasks?class_id=${classId}`, {
      method: "GET",
      headers: { "X-Sisva-Source": "academic.curriculum.test" },
    });

    return serverResponseHandler(
      res,
      "Error get all task by class id",
      "Success get all task by class id"
    );
  } catch (error) {
    throw error;
  }
};

export async function getUserById(id) {
  const userRes = await AppFetchApi(`/user/v1/users/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    userRes,
    "Failed to get user data",
    "Success to get user data"
  );
}
