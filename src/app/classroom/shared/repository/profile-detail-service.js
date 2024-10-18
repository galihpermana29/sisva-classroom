"use server";

import { AppFetchApi } from "../usecase/global-fetch-api";
import { serverResponseHandler } from "../usecase/server-response-handler";

export async function getProfileDetail(id) {
  const res = await AppFetchApi(`/user/v1/users/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "test",
    },
  });

  return serverResponseHandler(
    res,
    "Error get profile detail",
    "Success get profile detail"
  );
}

export async function updateProfile(userId, payload) {
  const res = await AppFetchApi(`/user/v1/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "X-Sisva-Source": "tenant.user.test",
    },
  });

  return serverResponseHandler(
    res,
    "Error update profile",
    "Success update profile"
  );
}

export async function changePassword(payload) {
  const res = await AppFetchApi("/tenant/v1/user/password", {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "X-Sisva-Source": "test",
    },
  });

  return serverResponseHandler(
    res,
    "Error change password",
    "Success change password"
  );
}

export async function resetPassword(payload) {
  const res = await AppFetchApi("/tenant/v1/user/password", {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "X-Sisva-Source": "test",
    },
  });

  return serverResponseHandler(
    res,
    "Error reset password",
    "Success reset password"
  );
}
