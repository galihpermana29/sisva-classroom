import EmptyData from "@/app/classroom/shared/presentation/EmptyData";
import Link from "next/link";
import React from "react";
import ClassCard from "./ClassCard";
import ClassCardSkeleton from "./ClassCardSkeleton";

const StudentClassList = ({ classes = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 p-6 mt-6 shadow rounded-xl md:grid-cols-2 xl:grid-cols-3 md:border-none md:shadow-card">
        {Array.from({ length: 6 }).map((_, index) => (
          <ClassCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <EmptyData
        title="Tidak ada kelas"
        subtitle="Tidak ada kelas yang tersedia untuk saat ini"
      />
    );
  }

  return (
    <div className="grid gap-4 p-6 mt-6 shadow rounded-xl md:grid-cols-2 xl:grid-cols-3 md:border-none md:shadow-card">
      {classes.map((classItem) => (
        <Link
          key={classItem.id}
          href={`/classroom/student/class/${classItem.id}`}
        >
          <ClassCard
            subject={classItem.subject_name}
            teacherPhoto={classItem.teacher_photo}
            teacherName={classItem.teacher_name}
            group={classItem.student_group_name}
            schedules={classItem.schedules}
            // taskName={classItem?.tasks[0]?.name || "No Task"}
            // timeStamp={classItem?.tasks[0]?.deadline}
            // isEmptyTask={classItem.tasks.length === 0}
          />
        </Link>
      ))}
    </div>
  );
};

export default StudentClassList;
