import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import CardGridSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardGridSkeleton";
import Link from "next/link";
import React from "react";
import ClassCard from "./ClassCard";

const ClassListGroup = ({ classData, isLoading }) => {
  if (isLoading) {
    return <CardGridSkeleton />;
  }

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      {classData.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {classData.map((classItem, idx) => (
            <Link
              key={idx}
              href={`/classroom/teacher/class/${classItem.id}`}
              passHref
            >
              <ClassCard
                group={classItem.student_group_name}
                subject={classItem.subject_name}
                taskName={classItem.nearest_task?.name}
                timeStamp={classItem.nearest_task?.deadline}
                isEmptyTask={!classItem.nearest_task}
              />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Tidak ada kelas"
          description="Tidak ada kelas yang tersedia untuk saat ini"
        />
      )}
    </div>
  );
};

export default ClassListGroup;
