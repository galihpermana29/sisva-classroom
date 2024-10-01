"use client";

import React from "react";
import Cardtask from "@/app/classroom/shared/presentation/Card/CardTask";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import { Flex } from "antd";
import styles from "./TaskSection.module.css";
import { useGetAllTeacherTasks } from "../../usecase/useGetAllTeacherTasks";
import { convertDateTime12To24 } from "../../usecase/convertDateTime12To24";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import CardTaskSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardTaskSkeleton";

const TaskSection = () => {
  const { data: tasks, isLoading } = useGetAllTeacherTasks();

  return (
    <SectionLayout title="Tugasku">
      <div className={`md:h-[225px] overflow-y-auto ${styles.scrollableDiv}`}>
        <div className="flex flex-row md:flex-col md:gap-3">
          {isLoading ? (
            <div className="flex gap-2 md:flex-col">
              {Array.from({ length: 3 }).map((_, index) => (
                <CardTaskSkeleton key={index} />
              ))}
            </div>
          ) : !tasks || tasks.length == 0 ? (
            <EmptyState
              title="Tidak ada tugas"
              description="Tidak ada tugas yang sedang aktif"
            />
          ) : (
            tasks.map((task, index) => (
              <Cardtask
                key={task.id || index}
                deadline={convertDateTime12To24(task.deadline)}
                teacherName={task.teacher_name}
                taskName={task.name}
                lessonName={task.subject_name}
              />
            ))
          )}
        </div>
      </div>
    </SectionLayout>
  );
};

export default TaskSection;
