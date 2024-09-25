import { useEffect, useState } from "react";

export const useQueryStudentProfile = () => {
  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchStudentData = async () => {
      const headers = {
        "X-Sisva-Source": process.env.PROVIDED_SOURCE_HEADER,
        "X-Sisva-UserID": USER_ID,
        "X-Sisva-SchoolID": SCHOOL_ID,
        Authorization: `Bearer ${BEARER_TOKEN}`,
      };

      try {
        const studentsRes = await fetch(
          `${process.env.API_SERVICE_BASE_URL}/student-groups/students`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!studentsRes.ok) {
          throw new Error("Failed to fetch student data");
        }

        const students = await studentsRes.json();
        const foundStudent = students.data.data.find(
          (student) => student.student_id === userId
        );

        const userRes = await fetch(
          `${process.env.API_SERVICE_BASE_URL}/users/${foundStudent.student_id}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!userRes.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userRes.json();
        setStudent({
          student_name: foundStudent.student_name,
          student_group_name: foundStudent.student_group_name,
          student_image: userData.data.data.profile_image_uri,
        });
      } catch (error) {
        console.error("Failed to fetch student data", error);
      }
    };

    fetchStudentData();
  }, []);

  return student;
};
