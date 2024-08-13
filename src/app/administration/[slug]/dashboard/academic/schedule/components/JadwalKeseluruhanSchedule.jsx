"use client";

import AcademicAPI from "@/api/academic";
import { useEffect, useState } from "react";
import TimelineWeekSchedule from "./TimelineWeekSchedule";

export const JadwalKeseluruhanSchedule = ({ data }) => {
  const [studentGroup, setStudentGroup] = useState([]);

  const getAllStudentGroup = async () => {
    const { data } = await AcademicAPI.getAllStudentGroup();

    setStudentGroup(
      data.data.map((value) => {
        let group_id;

        if (value.grade === "X") {
          group_id = 1;
        } else if (value.grade === "XI") {
          group_id = 2;
        } else if (value.grade === "XII") {
          group_id = 3;
        }

        return {
          ...value,
          group_id,
        };
      })
    );
  };

  useEffect(() => {
    getAllStudentGroup();
  }, []);

  return <TimelineWeekSchedule data={data} classData={studentGroup} />;
};

const data = [
  // {
  //   Id: 1,
  //   Subject: "Matematika",
  //   StartTime: new Date(2024, 7, 19, 8, 0),
  //   EndTime: new Date(2024, 7, 19, 9, 0),
  //   student_group_id: 7,
  //   KelasId: 1,
  // },
  // {
  //   Id: 2,
  //   Subject: "Bahasa Indonesia",
  //   StartTime: new Date(2024, 7, 19, 9, 0),
  //   EndTime: new Date(2024, 7, 19, 10, 0),
  //   ProdiId: 2,
  //   KelasId: 2,
  // },
  // {
  //   Id: 3,
  //   Subject: "Fisika",
  //   StartTime: new Date(2024, 7, 19, 10, 0),
  //   EndTime: new Date(2024, 7, 19, 11, 0),
  //   ProdiId: 1,
  //   KelasId: 3,
  // },
  // {
  //   Id: 4,
  //   Subject: "Sejarah",
  //   StartTime: new Date(2024, 7, 19, 11, 0),
  //   EndTime: new Date(2024, 7, 19, 12, 0),
  //   ProdiId: 3,
  //   KelasId: 1,
  // },
  // {
  //   Id: 5,
  //   Subject: "Biologi",
  //   StartTime: new Date(2024, 7, 19, 13, 0),
  //   EndTime: new Date(2024, 7, 19, 14, 0),
  //   ProdiId: 2,
  //   KelasId: 3,
  // },
  // {
  //   Id: 6,
  //   Subject: "Ekonomi",
  //   StartTime: new Date(2024, 7, 19, 14, 0),
  //   EndTime: new Date(2024, 7, 19, 15, 0),
  //   ProdiId: 4,
  //   KelasId: 2,
  // },
  // {
  //   Id: 7,
  //   Subject: "Seni Budaya",
  //   StartTime: new Date(2024, 7, 20, 8, 0),
  //   EndTime: new Date(2024, 7, 20, 9, 0),
  //   ProdiId: 3,
  //   KelasId: 3,
  // },
  // {
  //   Id: 8,
  //   Subject: "Penjaskes",
  //   StartTime: new Date(2024, 7, 20, 9, 0),
  //   EndTime: new Date(2024, 7, 20, 10, 0),
  //   ProdiId: 1,
  //   KelasId: 2,
  // },
  // {
  //   Id: 9,
  //   Subject: "Bahasa Inggris",
  //   StartTime: new Date(2024, 7, 20, 10, 0),
  //   EndTime: new Date(2024, 7, 20, 11, 0),
  //   ProdiId: 2,
  //   KelasId: 1,
  // },
  // {
  //   Id: 10,
  //   Subject: "Kimia",
  //   StartTime: new Date(2024, 7, 20, 11, 0),
  //   EndTime: new Date(2024, 7, 20, 12, 0),
  //   ProdiId: 4,
  //   KelasId: 3,
  // },
];
