import { useState, useEffect } from "react";

import { getStudentGroups, getUserById } from "../repository/student";

export function useGetStudentProfile() {
  const [student, setStudent] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const studentGroups = await getStudentGroups();
        const foundStudent = studentGroups.find(
          (student) =>
            student.student_id === "5ffcd106-3e30-4e7d-bbbf-23c7bcd9a3a3"
        );
        const userData = await getUserById(foundStudent.student_id);
        setStudent({
          student_name: foundStudent.student_name,
          student_group_name: foundStudent.student_group_name,
          student_image: userData.profile_image_uri,
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return {
    student,
    error,
    isLoading,
  };
}
