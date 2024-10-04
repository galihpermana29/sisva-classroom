import React from "react";
import ClassCard from "./ClassCard";
import CardGridSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardGridSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";

const ClassListGroup = ({ classData, isLoading }) => {
  if (isLoading) {
    return <CardGridSkeleton />;
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      {classData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {classData.map((classItem, idx) => (
            <ClassCard
              key={idx}
              group={classItem.student_group_name}
              subject={classItem.subject_name}
              taskName={classItem.task_list[0]?.name}
              timeStamp={classItem.task_list[0]?.deadline}
              isEmptyTask={classItem.task_list.length === 0}
            />
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
