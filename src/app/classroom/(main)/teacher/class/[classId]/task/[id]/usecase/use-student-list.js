import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getAllClasses,
  getAllTasks,
  getStudentInGroups,
  getStudentScores,
  getUserById,
} from "../repository/scoring-submission-service";

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

  const { data: classes } = useQuery({
    queryKey: ["clasess"],
    queryFn: getAllClasses,
  });

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
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

    if (!Array.isArray(classes?.data) || !Array.isArray(tasks?.data)) {
      setLoading(false);
    }

    const classDetail = classes?.data?.find((cls) => cls.id == classId);

    const studentsGroup = studentInGroup.data.filter(
      (student) => student.student_group_id == classDetail.student_group_id
    );

    if (!Array.isArray(studentsGroup) || studentsGroup.length <= 0) {
      setLoading(false);
      setStudents(null);
      return;
    }

    const fetchFinalStudentScores = async () => {
      const finalStudentScores = await Promise.all(
        studentsGroup.map(async (student) => {
          const studentImage = await getStudentImage(student.student_id);
          const scoreStudent = studentScores.data.find(
            (score) => score.student_id == student.student_id
          );
          const studentScore = scoreStudent ? scoreStudent.value : null;

          return {
            student_image: studentImage,
            student_name: student.student_name,
            student_id: student.student_id,
            student_score: studentScore,
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
