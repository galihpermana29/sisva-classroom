import { AppFetchApi } from "@/app/classroom/shared/usecase/global-fetch-api";

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
  if (!studentsRes.ok) {
    throw new Error("Failed to fetch student data");
  }
  const { data } = await studentsRes.json();
  return data;
}

export async function getUserById(id) {
  const userRes = await AppFetchApi(`/user/v1/users/${id}`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  if (!userRes.ok) {
    throw new Error("Failed to fetch user data");
  }

  const { data } = await userRes.json();
  return data;
}

export async function getAllClasses() {
  const classesRes = await AppFetchApi(
    "/academic/v1/student-groups?type=homeroom",
    {
      method: "GET",
      headers: {
        "X-Sisva-Source": "academic.curriculum.test",
      },
    }
  );

  if (!classesRes.ok) {
    throw new Error("Failed to fetch user data");
  }

  const { data } = await classesRes.json();
  return data;
}

export async function getAllTasks() {
  const tasksRes = await AppFetchApi("/classroom/v1/tasks", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  if (!tasksRes.ok) {
    throw new Error("Failed to fetch user data");
  }

  const { data } = await tasksRes.json();
  return data;
}

export async function getAllClassSchedules() {
  const schedulesRes = await AppFetchApi(`/academic/v1/class-schedules`, {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  if (!schedulesRes.ok) {
    throw new Error("Failed to fetch user data");
  }

  const { data } = await schedulesRes.json();
  return data;
}

export async function getAllAnnouncements() {
  const announcementsRes = await AppFetchApi("/academic/v1/announcements", {
    method: "GET",
    headers: {
      "X-Sisva-Source": "academic.curriculum.test",
    },
  });

  if (!announcementsRes.ok) {
    throw new Error("Failed to fetch user data");
  }

  const { data } = await announcementsRes.json();
  return data;
}
