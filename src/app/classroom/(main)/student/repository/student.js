const headers = {
  "X-Sisva-Source": "academic.curriculum.test",
  "X-Sisva-UserID": "0710e3fc-86d5-4ada-829e-38952c75a9ea",
  "X-Sisva-SchoolID": "0a49a174-9ff5-464d-86c2-3eb1cd0b284e",
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDcxMGUzZmMtODZkNS00YWRhLTgyOWUtMzg5NTJjNzVhOWVhIiwidXNlcm5hbWUiOiJkZXN0YSIsInNjaG9vbF9pZCI6IjBhNDlhMTc0LTlmZjUtNDY0ZC04NmMyLTNlYjFjZDBiMjg0ZSIsImV4cCI6MTcyNzM3MDc1Mn0.2fGurS7Atq-QicUAUK2JylXfAKgP9LdeQzB3aM-Bn2s`,
};

const BASE_URL = process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL;

export async function getStudentGroups() {
  const studentsRes = await fetch(
    `${BASE_URL}/academic/v1/student-groups/students`,
    {
      method: "GET",
      headers: headers,
    }
  );
  if (!studentsRes.ok) {
    throw new Error("Failed to fetch student data");
  }
  const { data } = await studentsRes.json();
  return data;
}

export async function getUserById(id) {
  const userRes = await fetch(`${BASE_URL}/user/v1/users/${id}`, {
    method: "GET",
    headers: headers,
  });

  if (!userRes.ok) {
    throw new Error("Failed to fetch user data");
  }

  const { data } = await userRes.json();
  return data;
}

export async function getAllClasses() {
  const classesRes = await fetch(
    `${BASE_URL}/academic/v1/student-groups?type=homeroom`,
    {
      method: "GET",
      headers: headers,
    }
  );

  if (!classesRes.ok) {
    throw new Error("Failed to fetch user data");
  }

  const { data } = await classesRes.json();
  return data;
}

export async function getAllTasks() {
  const tasksRes = await fetch(`${BASE_URL}/classroom/v1/tasks`, {
    method: "GET",
    headers: headers,
  });

  if (!tasksRes.ok) {
    throw new Error("Failed to fetch user data");
  }

  const { data } = await tasksRes.json();
  return data;
}

export async function getAllClassSchedules() {
  const schedulesRes = await fetch(`${BASE_URL}/academic/v1/class-schedules`, {
    method: "GET",
    headers: headers,
  });

  if (!schedulesRes.ok) {
    throw new Error("Failed to fetch user data");
  }

  const { data } = await schedulesRes.json();
  return data;
}

export async function getAllAnnouncements() {
  const announcementsRes = await fetch(
    `${BASE_URL}/academic/v1/announcements`,
    {
      method: "GET",
      headers: headers,
    }
  );

  if (!announcementsRes.ok) {
    throw new Error("Failed to fetch user data");
  }

  const { data } = await announcementsRes.json();
  return data;
}
