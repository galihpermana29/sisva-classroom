"use client";

import CardTask from "@/app/classroom/shared/presentation/Card/CardTask";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import { useGetStudentTask } from "@/app/classroom/(main)/student/usecase/useGetStudentTask";
import CardTaskSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardTaskSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import { convertDateTime12To24 } from "@/app/classroom/(main)/student/usecase/convertDateTime12To24";
import Link from "next/link";

const StudentTaskSection = () => {
  const { tasks, isLoading } = useGetStudentTask();
  
  return (
    <SectionLayout title={"Tugas yang Akan Datang"}>
      <div className="lg:h-full lg:max-h-[228px] p-1 overflow-auto">
        <div className="flex flex-row gap-3 lg:flex-col">
          {isLoading ? (
            [...new Array(3)].map((_, index) => (
              <CardTaskSkeleton key={index} />
            ))
          ) : tasks.length > 0 ? (
            tasks.map((task, index) => (
              <Link
                href={`/classroom/teacher/class/${task.class_id}/task/${task.id}`}
                key={index}
              >
              <CardTask
                taskName={task.name}
                teacherName={task.teacher_name}
                lessonName={task.subject_name}
                deadline={convertDateTime12To24(task.deadline)}
              />
              </Link>
            ))
          ) : (
            <div className="mx-auto">
              <EmptyState
                title="Tidak ada Tugas Tersedia!"
                description="Tidak ada tugas yang tersedia untuk saat ini."
              />
            </div>
          )}
        </div>
      </div>
    </SectionLayout>
  );
};

export default StudentTaskSection;
