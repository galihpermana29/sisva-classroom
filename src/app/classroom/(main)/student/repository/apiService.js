"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export async function getStudentGroups() {
  const studentsRes = await AppFetchApi(
    "/academic/v1/student-groups/students",
    {
      method: "GET",
      headers: {
        "X-Sisva-Source": "academic.curriculum.test",
      },
    }
  );
  return serverResponseHandler(
    studentsRes,
    "Failed to get student data",
    "Success to get student data"
  );
}

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

export async function getAllClasses() {
  const classesRes = await AppFetchApi("/academic/v1/classes", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    classesRes,
    "Failed to get all classess ",
    "Success to get all classes"
  );
}

export async function getAllTasks() {
  const tasksRes = await AppFetchApi("/classroom/v1/tasks", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    tasksRes,
    "Failed to get all tasks",
    "Success to get all tasks"
  );
}

export async function getAllClassSchedules() {
  const schedulesRes = await AppFetchApi(`/academic/v1/class-schedules`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    schedulesRes,
    "Failed to get all schedules",
    "Success to get all schedules"
  );
}

export async function getAllAnnouncements() {
  const announcementsRes = await AppFetchApi("/academic/v1/announcements", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    announcementsRes,
    "Failed to get all announcements",
    "Success to get all announcements"
  );
}
