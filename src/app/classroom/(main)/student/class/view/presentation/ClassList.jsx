import React from "react";
import ClassCard from "./ClassCard";
import EmptyData from "@/app/classroom/shared/presentation/EmptyData";
import CardClassSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardClassSkeleton";

const StudentClassList = ({ classes, isLoading }) => {
  return (
    <div className="grid gap-4 p-6 mt-6 shadow md:grid-cols-2 xl:grid-cols-3 rounded-xl md:border-none md:shadow-card">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <CardClassSkeleton key={index} />
        ))
      ) : classes.length == 0 ? (
        <EmptyData
          title="Tidak ada kelas"
          subtitle="Tidak ada kelas yang tersedia untuk saat ini"
        />
      ) : (
        classes.map((classItem, index) => (
          <ClassCard
            key={"class_" + index}
            subject={classItem.subject_name}
            teacherPhoto={classItem.teacher_photo}
            teacherName={classItem.teacher_name}
            group={classItem.student_group_name}
            taskName={classItem.tasks[0]?.name}
            timeStamp={classItem.tasks[0]?.deadline}
            isEmptyTask={classItem.tasks.length === 0}
          />
        ))
      )}
    </div>
  );
};

export default StudentClassList;
