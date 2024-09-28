"use client";

import { Flex } from "antd";
import CardTask from "@/app/classroom/shared/presentation/Card/CardTask";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import { useGetStudentTask } from "@/app/classroom/(main)/student/usecase/useGetStudentTask";
import CardTaskSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardTaskSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import { convertDateTime12To24 } from "@/app/classroom/(main)/student/usecase/convertDateTime12To24";

const StudentTaskSection = () => {
  const { tasks, isLoading } = useGetStudentTask();
  return (
    <SectionLayout title={"Tugas yang Akan Datang"}>
      <div className="lg:h-full lg:max-h-[228px] p-1 overflow-auto">
        <Flex gap={12} className="flex-row lg:flex-col ">
          {isLoading ? (
            [...new Array(3)].map((_, index) => (
              <CardTaskSkeleton key={index} />
            ))
          ) : tasks.length > 0 ? (
            tasks.map((task, index) => (
              <CardTask
                key={index}
                taskName={task.name}
                teacherName={task.teacher_name}
                lessonName={task.subject_name}
                deadline={convertDateTime12To24(task.deadline)}
              />
            ))
          ) : (
            <div className="mx-auto">
              <EmptyState
                title="Tidak ada Tugas Tersedia!"
                description="Tidak ada tugas yang tersedia untuk saat ini."
              />
            </div>
          )}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default StudentTaskSection;
