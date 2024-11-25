import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAttendanceStudent,
  getStudentGroups,
  getUserById,
  setAttendanceStudent,
} from "../repository/teacher-attendance-service";
import { getAllClasses } from "../repository/teacher-score-service";

dayjs.extend(isoWeek);

export function useAttendance() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { classId } = params;

  useEffect(() => {
    const fetchData = async () => {
      const { data: studentGroups, success: successStudentGroups } =
        await getStudentGroups();

      if (!successStudentGroups || !Array.isArray(studentGroups)) {
        setLoading(false);
        return;
      }

      const { data: classes, success: successClasses } = await getAllClasses();

      if (!successClasses || !Array.isArray(classes)) {
        setLoading(false);
        return;
      }

      const foundClass = classes.find((cls) => cls.id == classId);

      const foundStudentGroup = studentGroups.filter(
        (student) => student.student_group_id == foundClass.student_group_id
      );

      const startOfWeek = dayjs().isoWeekday(1);
      const endOfWeek = dayjs().isoWeekday(6);
      const fetchedAttendances = [];

      for (
        let date = startOfWeek;
        date.isBefore(endOfWeek) || date.isSame(endOfWeek);
        date = date.add(1, "day")
      ) {
        const formattedDate = date.format("YYYYMMDD");

        for (const student of foundStudentGroup) {
          const { student_id } = student;

          const { data: studentDetail } = await getUserById(student_id);

          const { data, message, success } =
            await getAttendanceStudent(formattedDate);

          if (success && Array.isArray(data)) {
            const studentAttendance = data.find(
              (attendance) => attendance.student_id === student_id
            );

            if (studentAttendance) {
              fetchedAttendances.push({
                date: formattedDate,
                student_id: studentAttendance.student_id,
                student_name: student.student_name,
                student_profile_uri: studentDetail.profile_image_uri,
                status: studentAttendance.status,
              });
            } else {
              fetchedAttendances.push({
                date: formattedDate,
                student_id: student.student_id,
                student_profile_uri: studentDetail.profile_image_uri,
                student_name: student.student_name,
                status: "absent",
              });
            }
          } else {
            fetchedAttendances.push({
              date: formattedDate,
              student_id: student.student_id,
              student_profile_uri: studentDetail.profile_image_uri,
              student_name: student.student_name,
              status: "absent",
            });
          }
        }
      }

      setAttendances(fetchedAttendances);
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    attendances,
    loading,
  };
}

export function useUpdateAttendance() {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { classId } = params;

  const updateAttendance = async ({ student_id, date_id, status }) => {
    setLoading(true);
    const payload = {
      date_id,
      status,
    };
    const res = await setAttendanceStudent(classId, student_id, payload);

    if (res.success) {
      toast.success("Success update attendance ");
      setLoading(false);
      return true;
    } else {
      toast.error("Failed update attendance");
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    updateAttendance,
  };
}
