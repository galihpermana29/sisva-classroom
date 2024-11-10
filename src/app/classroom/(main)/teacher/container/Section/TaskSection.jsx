"use client";

import Cardtask from "@/app/classroom/shared/presentation/Card/CardTask";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import CardTaskSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardTaskSkeleton";
import { DEADLINE_FORMAT_24, generalDateFormatter } from "@/app/classroom/shared/usecase/helper";
import Link from "next/link";
import { useGetAllTeacherTasks } from "../../usecase/useGetAllTeacherTasks";

const TaskSection = () => {
  const { data: tasks, isLoading } = useGetAllTeacherTasks();

  return (
    <SectionLayout title="Tugasku">
      <div className={`md:h-[225px] overflow-y-auto`}>
        <div className="flex flex-row md:flex-col md:gap-3">
          {isLoading ? (
            <div className="flex gap-2 md:flex-col">
              {Array.from({ length: 3 }).map((_, index) => (
                <CardTaskSkeleton key={index} />
              ))}
            </div>
          ) : !tasks || tasks.length == 0 ? (
            <div className="mx-auto">
              <EmptyState
                title="Tidak ada tugas"
                description="Tidak ada tugas yang sedang aktif"
              />
            </div>
          ) : (
            tasks.map((task, index) => (
              <Link key={'task_'+task.id} href={`/classroom/teacher/class/${task.class_id}/task/${task.id}`}>
                <Cardtask
                  key={task.id || index}
                  deadline={generalDateFormatter(task.deadline, DEADLINE_FORMAT_24)}
                  teacherName={task.teacher_name}
                  taskName={task.name}
                  lessonName={task.subject_name}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </SectionLayout>
  );
};

export default TaskSection;
