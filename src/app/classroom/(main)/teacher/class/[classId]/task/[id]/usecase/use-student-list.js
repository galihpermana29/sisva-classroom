import { useEffect, useState } from "react";
import {
  getStudentInGroups,
  getStudentScores,
  getUserById,
} from "../repository/scoring-submission-service";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export function useGetStudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const { classId, id } = params;

  const { data: studentInGroup = [], isLoading: isGroupLoading } = useQuery({
    queryKey: ["student-groups", classId],
    queryFn: getStudentInGroups,
  });

  const { data: studentScores = [], isLoading: isScoresLoading } = useQuery({
    queryKey: ["student-scores", id],
    queryFn: () => getStudentScores(id),
  });

  const getStudentImage = async (id) => {
    const { data: profile } = await getUserById(id);
    return profile.profile_image_uri;
  };

  useEffect(() => {
    if (
      !Array.isArray(studentInGroup.data) ||
      !Array.isArray(studentScores.data)
    ) {
      setError("Invalid data format");
      setLoading(false);
      return;
    }

    const studentsGroup = studentInGroup.data.filter(
      (student) => student.student_group_id == classId
    );

    const fetchFinalStudentScores = async () => {
      const finalStudentScores = await Promise.all(
        studentScores.data.map(async (score, index) => {
          const studentImage = await getStudentImage(
            studentsGroup[index].student_id
          );
          const scoreStudent = studentsGroup.find(
            (student) => student.student_id == score.student_id
          );
          if (scoreStudent) {
            return {
              student_image: studentImage,
              student_name: scoreStudent.student_name,
              student_id: scoreStudent.student_id,
              student_score: score.value,
            };
          }
          return {
            student_image: studentDetail,
            student_name: scoreStudent.student_name,
            student_id: scoreStudent.student_id,
            student_score: null,
          };
        })
      );

      setStudents(finalStudentScores);
      setLoading(false);
    };

    fetchFinalStudentScores();
  }, [studentInGroup, studentScores]);

  return {
    students,
    loading: isGroupLoading || isScoresLoading || loading,
    error,
  };
}
