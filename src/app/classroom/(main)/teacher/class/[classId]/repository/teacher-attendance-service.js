"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export async function getAttendanceStudent(date_id) {
  const attendances = await AppFetchApi(
    `/attendance/v1/classes/students?date_id=${date_id}`,
    {
      method: "GET",
      headers: {
        "X-Sisva-Source": "tenant.user.test",
      },
    }
  );

  return serverResponseHandler(
    attendances,
    "Failed get attendance students",
    "Success get attendance students"
  );
}

export async function getUserById(id) {
  const student = await AppFetchApi(`/user/v1/users/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });

  return serverResponseHandler(
    student,
    "Failed get student detail",
    "Success get student detail"
  );
}

export async function getAllClasses() {
  const clasess = await AppFetchApi(`/academic/v1/classes`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    clasess,
    "Failed get clasess",
    "Success get clasess"
  );
}

export async function getStudentGroups() {
  const students = await AppFetchApi(`/academic/v1/student-groups/students`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  return serverResponseHandler(
    students,
    "Failed get attendance students",
    "Success get attendance students"
  );
}

export async function setAttendanceStudent(class_id, student_id, data) {
  const response = await AppFetchApi(
    `/attendance/v1/classes/${class_id}/students/${student_id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "X-Sisva-Source": "tenant.user.test",
      },
    }
  );

  return serverResponseHandler(
    response,
    "Failed set attendance student",
    "Success set attendance student"
  );
}
