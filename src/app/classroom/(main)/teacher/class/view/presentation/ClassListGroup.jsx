import React from "react";
import CardGridSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardGridSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import Link from "next/link";
import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import ClassCard from "@/app/classroom/(main)/student/class/view/presentation/ClassCard";

const ClassListGroup = ({ classData, isLoading }) => {
  if (isLoading) {
    return <CardGridSkeleton />;
  }

  const getProfilePhoto = () => {
    const userData = getClientSession();

    return userData?.profile_image_uri;
  };

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
                subject={classItem.subject_name}
                teacherPhoto={getProfilePhoto()}
                teacherName={classItem.teacher_name}
                group={classItem.student_group_name}
                schedules={classItem.schedule}
                isEmptySchedules={classItem.schedule.length === 0}
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
