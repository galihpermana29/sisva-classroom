import React from "react";
import ClassCard from "./ClassCard";
import CardGridSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardGridSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setClassData } from "@/app/classroom/shared/redux/classSlice";

const ClassListGroup = ({ classData, isLoading }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  if (isLoading) {
    return <CardGridSkeleton />;
  }
  const handleClickClass = (classItem) => {
    router.push(`/classroom/teacher/class/${classItem.id}`);
    dispatch(setClassData(classItem));
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      {classData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {classData.map((classItem, idx) => (
            <ClassCard
              onClick={() => handleClickClass(classItem)}
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
