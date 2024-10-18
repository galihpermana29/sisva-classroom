import SubmissionTask from "./SubmissionTask/SubmissionTask";
import TaskDetail from "./TaskDetail/TaskDetail";

const StudentSubmissionTaskContainer = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <TaskDetail />
      <SubmissionTask />
    </div>
  );
};

export default StudentSubmissionTaskContainer;
