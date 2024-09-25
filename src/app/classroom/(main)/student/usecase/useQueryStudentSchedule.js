import { useEffect, useState } from "react";

export const useQueryStudentSchedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentRes = await fetch("/student-groups/students", {
          method: "GET",
          headers: {
            "X-Sisva-Source": "academic.period.test",
            "X-Sisva-UserID": USER_ID,
            "X-Sisva-SchoolID": SCHOOL_ID,
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        const students = await studentRes.json();
        const foundStudent = students.data.find(
          (student) => student.student_id === userId
        );
        const studentGroupId = foundStudent.student_group_id;

        const classRes = await fetch("/student-groups", {
          method: "GET",
          headers: {
            "X-Sisva-Source": "academic.studentgroups.test",
            "X-Sisva-UserID": USER_ID,
            "X-Sisva-SchoolID": SCHOOL_ID,
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        const classes = await classRes.json();
        const classStudent = classes.data.filter(
          (studentClass) => studentClass.student_group_id == studentGroupId
        );

        const scheduleRes = await fetch("/class-schedules", {
          method: "GET",
          headers: {
            "X-Sisva-Source": "academic.test",
            "X-Sisva-UserID": USER_ID,
            "X-Sisva-SchoolID": SCHOOL_ID,
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        const schedules = await scheduleRes.json();

        const filteredSchedule = schedules.data
          .map((schedule) => {
            const classData = classStudent.find(
              (cls) => cls.id == schedule.class_id
            );
            return classData;
          })
          .filter((schedule) => schedule != null);

        setSchedule(filteredSchedule);
      } catch (error) {
        console.error("Failed to fetch student data", error);
      }
    };

    fetchStudentData();
  }, []);

  return schedule;
};
