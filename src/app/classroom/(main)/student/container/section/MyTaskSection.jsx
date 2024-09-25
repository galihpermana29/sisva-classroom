"use client";

import { Flex } from "antd";
import CardTask from "@/app/classroom/shared/presentation/Card/CardTask";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import { useQueryStudentTask } from "@/app/classroom/(main)/student/usecase/useQueryStudentTask";

const MyTask = () => {
  const tasks = useQueryStudentTask();
  return (
    <SectionLayout title={"Tugas yang Akan Datang"}>
      <div className="lg:h-[228px] overflow-scroll">
        <Flex gap={12} className="flex-row lg:flex-col ">
          {tasks.length >= 0 &&
            tasks.map((task, index) => (
              <CardTask
                key={index}
                taskName={task.name}
                teacherName={task.teacher_name}
                lessonName={task.subject_name}
                deadline={task.deadline}
              />
            ))}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default MyTask;
