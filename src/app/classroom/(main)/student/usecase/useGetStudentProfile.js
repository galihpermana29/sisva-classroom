import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { getStudentGroups, getUserById } from "../repository/apiService";

export function useGetStudentProfile() {
  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(getCookie("userData"));

      const {
        data: studentGroups,
        success,
        message,
      } = await getStudentGroups();

      if (!success) {
        setError(message);
        setIsLoading(false);
        return;
      }

      const foundStudent = studentGroups.find(
        (student) => student.student_id === user.id
      );
      if (!foundStudent) {
        throw new Error("Students have not yet joined the class");
      }
      const {
        data: studentData,
        success: studentResSuccess,
        message: studentResMessage,
      } = await getUserById(foundStudent.student_id);

      if (!studentResSuccess) {
        setError(studentResMessage);
        setIsLoading(false);
        return;
      }
      setStudent({
        student_name: foundStudent.student_name,
        student_group_name: foundStudent.student_group_name,
        student_image: studentData.profile_image_uri,
      });

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    student,
    error,
    isLoading,
  };
}
