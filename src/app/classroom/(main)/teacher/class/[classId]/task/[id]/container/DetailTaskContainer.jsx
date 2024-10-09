"use client";

import { useDetailTask } from "../usecase/use-detail-task";
import DetailTaskSectionTop from "./Section/DetailTaskSectionTop";
import ScoringSection from "./Section/ScoringSection";
import StudentList from "./Section/StudentList";

export default function DetailTaskContainer() {
  const { task, loading: taskLoading } = useDetailTask();

  return (
    <div>
      <DetailTaskSectionTop task={task} loading={taskLoading} />
      <div className="bg-white shadow-card mt-6">
        <div className="flex flex-col lg:flex-row">
          <StudentList />
          <ScoringSection deadline={task.task_deadline} />
        </div>
      </div>
    </div>
  );
}
