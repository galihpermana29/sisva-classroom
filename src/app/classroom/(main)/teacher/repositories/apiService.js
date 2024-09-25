export const mockUser = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDcxMGUzZmMtODZkNS00YWRhLTgyOWUtMzg5NTJjNzVhOWVhIiwidXNlcm5hbWUiOiJkZXN0YSIsInNjaG9vbF9pZCI6IjBhNDlhMTc0LTlmZjUtNDY0ZC04NmMyLTNlYjFjZDBiMjg0ZSIsImV4cCI6MTcyNzM1NDQxOH0.hdsjDne7nzpFjh-yoRHPmDznvFFoKzxphs0zzsUOh7w",
  source: "academic.curriculum.test",
  userID: "0710e3fc-86d5-4ada-829e-38952c75a9ea",
  schoolID: "0a49a174-9ff5-464d-86c2-3eb1cd0b284e",
  teacher_id_mock: "b447efe0-4884-4f59-9604-3c6bd61c4395",
};

const mockHeaders = {
  Authorization: `Bearer ${mockUser.token}`,
  "X-Sisva-Source": mockUser.source,
  "X-Sisva-UserID": mockUser.userID,
  "X-Sisva-SchoolID": mockUser.schoolID,
};

const endpoint_academic = process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL + "/academic/v1";
export const getAllSubjectTeached = async () => {
  const res = await fetch(`${endpoint_academic}/subjects/teachers`, {
    method: "GET",
    headers: {
      ...mockHeaders,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { data } = await res.json();

  const subjectsByTeacher = data.filter(
    (subject) => subject.teacher_id == mockUser.teacher_id_mock
  );

  return subjectsByTeacher;
};

const endpoint_user = process.env.NEXT_PUBLIC_API + "/user/v1";
export const getUserById = async (id = mockUser.teacher_id_mock) => {
  const res = await fetch(`${endpoint_user}/users/${id}`, {
    method: "GET",
    headers: {
      ...mockHeaders,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { data } = await res.json();

  console.log(data);

  return data;
};

const endpoint_class = process.env.NEXT_PUBLIC_API + "/classroom/v1";
export const getTeacherTasksById = async () => {
  const res = await fetch(`${endpoint_class}/tasks`, {
    method: "GET",
    headers: {
      ...mockHeaders,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { data } = await res.json();

  const classes = await getAllClasses();
  const teachedClasses = classes.filter(
    (classroom) => classroom.teacher_id == mockUser.teacher_id_mock
  );
  const teacherTasks = data.filter((task) =>
    teachedClasses.some((classroom) => classroom.id == task.class_id)
  );

  const finalData = teacherTasks.map((task) => {
    const { teacher_name, subject_name } = teachedClasses.find(
      (classroom) => classroom.id === task.class_id
    ) || {};
  
    return {
      ...task,
      teacher_name,
      subject_name,
    };
  });

  return finalData;
};

export const getAllClasses = async () => {
  const res = await fetch(`${endpoint_academic}/classes`, {
    method: "GET",
    headers: {
      ...mockHeaders,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { data } = await res.json();

  return data;
};

export const getClassScheduleById = async () => {
  const res = await fetch(`${endpoint_academic}/class-schedules`, {
    method: "GET",
    headers: {
      ...mockHeaders,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { data } = await res.json();

  const teachingSchedule = data.filter(
    (schedule) => schedule.teacher_id == mockUser.teacher_id_mock
  );

  return teachingSchedule;
};

export const getAllAnnouncements = async () => {
  const res = await fetch(`${endpoint_academic}/announcements`, {
    method: "GET",
    headers: {
      ...mockHeaders,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { data } = await res.json();

  console.log(data);

  return data;
}