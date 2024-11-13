"use client";

import { useGetStudentTask } from "@/app/classroom/(main)/student/usecase/useGetStudentTask";
import CardTask from "@/app/classroom/shared/presentation/Card/CardTask";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import CardTaskSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardTaskSkeleton";
import {
  DEADLINE_FORMAT_24,
  generalDateFormatter,
} from "@/app/classroom/shared/usecase/helper";
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
                href={`/classroom/student/class/${task.class_id}/task/${task.task_id}`}
                key={index}
              >
                <CardTask
                  taskName={task.name}
                  teacherName={task.teacher_name}
                  lessonName={task.subject_name}
                  deadline={generalDateFormatter(
                    task.deadline,
                    DEADLINE_FORMAT_24
                  )}
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
