"use client";
import { Flex } from "antd";
import CardTask from "@/app/classroom/shared/presentation/Card/CardTask";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import { useGetStudentTask } from "@/app/classroom/(main)/student/usecase/useGetStudentTask";
import CardTaskSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardTaskSkeleton";

const StudentTaskSection = () => {
  const { tasks, isLoading } = useGetStudentTask();
  return (
    <SectionLayout title={"Tugas yang Akan Datang"}>
      <div className="lg:h-full lg:max-h-[228px] p-1 overflow-scroll">
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
                deadline={task.deadline}
              />
            ))
          ) : (
            <div>
              <p>Tidak ada tugas</p>
            </div>
          )}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default StudentTaskSection;
