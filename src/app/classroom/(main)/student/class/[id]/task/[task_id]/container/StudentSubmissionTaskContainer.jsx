"use client";

import { useTask } from "../usecase/use-task-detail";
import SubmissionTask from "./SubmissionTask/SubmissionTask";
import TaskDetail from "./TaskDetail/TaskDetail";

const StudentSubmissionTaskContainer = () => {
  const { task, loading } = useTask();
  return (
    <div className="max-w-6xl mx-auto">
      <TaskDetail task={task} loading={loading} />
      <SubmissionTask
        allowOverdueSubmission={!task.allow_overdue_submission}
        allowSubmission={!task.allow_submission}
      />
    </div>
  );
};

export default StudentSubmissionTaskContainer;
