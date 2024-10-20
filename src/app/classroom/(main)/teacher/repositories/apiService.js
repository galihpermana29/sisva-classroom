"use server";

import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";
import { serverResponseHandler } from "@/app/classroom/shared/usecase/server-response-handler";

const endpoint_academic = "/academic/v1";
export const getAllTeachersSubjects = async () => {
  try {
    const res = await AppFetchApi(`${endpoint_academic}/subjects/teachers`, {
      method: "GET",
      headers: { "X-Sisva-Source": "academic.curriculum.test" },
    });

    return serverResponseHandler(
      res,
      "Error get all teachers subjects",
      "Success get all teachers subjects"
    );
  } catch (error) {
    throw error;
  }
};

const endpoint_user = "/user/v1";
export const getUserById = async (id) => {
  try {
    const res = await AppFetchApi(`${endpoint_user}/users/${id}`, {
      method: "GET",
      headers: { "X-Sisva-Source": "academic.curriculum.test" },
    });

    return serverResponseHandler(
      res,
      "Error get user by id",
      "Success get user by id"
    );
  } catch (error) {
    throw error;
  }
};

const endpoint_class = "/classroom/v1";
export const getTeacherTasks = async () => {
  try {
    const res = await AppFetchApi(`${endpoint_class}/tasks`, {
      method: "GET",
      headers: { "X-Sisva-Source": "academic.curriculum.test" },
    });

    return serverResponseHandler(
      res,
      "Error get teacher tasks by id",
      "Success get teacher tasks by id"
    );
  } catch (error) {
    throw error;
  }
};

export const getAllClasses = async () => {
  try {
    const res = await AppFetchApi(`${endpoint_academic}/classes`, {
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

export const getClassSchedules = async () => {
  try {
    const res = await AppFetchApi(`${endpoint_academic}/class-schedules`, {
      method: "GET",
      headers: { "X-Sisva-Source": "academic.curriculum.test" },
    });

    return serverResponseHandler(
      res,
      "Error get all class schedules",
      "Success get all class schedules"
    );
  } catch (error) {
    throw error;
  }
};

export const getAllAnnouncements = async () => {
  try {
    const res = await AppFetchApi(`${endpoint_academic}/announcements`, {
      method: "GET",
      headers: { "X-Sisva-Source": "academic.curriculum.test" },
    });

    return serverResponseHandler(
      res,
      "Error get all announcements",
      "Success get all announcements"
    );
  } catch (error) {
    throw error;
  }
};
