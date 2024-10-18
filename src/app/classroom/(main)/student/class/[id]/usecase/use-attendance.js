import { useEffect, useState } from "react";
import { getAttendanceByDate } from "../repository/attendance-service";
import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useParams } from "next/navigation";
dayjs.extend(isoWeek);

export function useAttendance() {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: student_id, name } = getClientSession();
  const params = useParams();
  const { id: classId } = params;

  useEffect(() => {
    const fetchData = async () => {
      const startOfWeek = dayjs().isoWeekday(1);
      const endOfWeek = dayjs().isoWeekday(6);

      const fetchedAttendances = [];

      for (
        let date = startOfWeek;
        date.isBefore(endOfWeek) || date.isSame(endOfWeek);
        date = date.add(1, "day")
      ) {
        const formattedDate = date.format("YYYYMMDD");

        const { data, message, success } = await getAttendanceByDate(
          formattedDate
        );

        const attendanceClass = data.filter(
          (attendance) => attendance.class_id == classId
        );

        if (attendanceClass && attendanceClass.length > 0) {
          const dataAbsent = attendanceClass.find(
            (attendance) => attendance.student_id === student_id
          );

          if (dataAbsent) {
            fetchedAttendances.push({
              date: formattedDate,
              student_id: dataAbsent.student_id,
              status: dataAbsent.status,
            });
          } else {
            fetchedAttendances.push({
              date: formattedDate,
              student_id,
              status: "absent",
            });
          }
        } else {
          fetchedAttendances.push({
            date: formattedDate,
            student_id,
            status: "absent",
          });
        }
      }

      setAttendances(fetchedAttendances);
      setLoading(false);
    };

    fetchData();
  }, [student_id, name]);

  return { attendances, loading };
}
