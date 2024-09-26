"use server";

import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

export async function getSchoolByCode(code) {
  const res = await fetch(
    `${process.env.API_SERVICE_BASE_URL}/tenant/v1/schools?code=${code}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Sisva-Source": "test",
      },
    }
  );

  return serverResponseHandler(
    res,
    "Error get school by code",
    "Success get school by code"
  );
}
export async function postLogin(data) {
  const res = await fetch(
    `${process.env.API_SERVICE_BASE_URL}/tenant/v1/user/login`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-Sisva-Source": "test",
      },
    }
  );

  return serverResponseHandler(res, "Login Failed", "Login Success");
}

export async function getUserById(id, schoolId, token) {
  const res = await fetch(
    `${process.env.API_SERVICE_BASE_URL}/user/v1/users/${id}`,
    {
      method: "GET",
      headers: {
        "X-Sisva-Source": "test",
        "X-Sisva-UserID": id,
        "X-Sisva-SchoolID": schoolId,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return serverResponseHandler(res, "Failed to get user", "Success get user");
}
