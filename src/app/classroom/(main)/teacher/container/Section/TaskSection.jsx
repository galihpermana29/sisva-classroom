"use client";

import React from "react";
import Cardtask from "@/app/classroom/shared/presentation/Card/CardTask";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import { Flex } from "antd";
import styles from "./TaskSection.module.css";
import { useGetAllTeacherTasks } from "../../usecase/useGetAllTeacherTasks";
import { convertDateTime12To24 } from "../../usecase/convertDateTime12To24";

const TaskSection = () => {
  const { data: tasks, isLoading } = useGetAllTeacherTasks();

  return (
    <SectionLayout title="Tugasku">
      <div className={`md:h-[225px] overflow-y-auto ${styles.scrollableDiv}`}>
        <Flex className="flex-row md:flex-col md:gap-3">
          {isLoading ? (
            <div className="flex gap-2 md:flex-col">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="rounded-lg flex h-[110px] gap-3 animate-pulse bg-text_description md:mr-3"></div>
              ))}
            </div>
          ) : (
            tasks.map((task, index) => {
              return (
                <Cardtask
                  key={index}
                  deadline={convertDateTime12To24(task.deadline)}
                  teacherName={task.teacher_name}
                  taskName={task.name}
                  lessonName={task.subject_name}
                />
              );
            })
          )}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default TaskSection;

