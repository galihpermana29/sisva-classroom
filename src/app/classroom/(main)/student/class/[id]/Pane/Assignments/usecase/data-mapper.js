import { getUserDataCookie } from "@/app/classroom/(main)/teacher/usecase/getUserDataCookie";
import { getStudentSubmissionByTaskID } from "../repository/student-assignment-service";

export async function groupTaskByTeachingPlan(tasks, teachingPlans) {
  const { id: userId } = getUserDataCookie();
  const groupedTasks = new Map();

  for (const plan of teachingPlans) {
    const matchedTasks = tasks.filter((task) =>
      plan.tasks?.some((planTask) => planTask.id === task.id)
    );

    const tasksWithSubmission = await Promise.all(
      matchedTasks.map(async (task) => {
        const submissionRes = await getStudentSubmissionByTaskID(task.id);
        const studentSubmission = submissionRes.data?.find(
          (submission) => submission.student_id === userId
        );
        return {
          ...task,
          submission: studentSubmission || null,
        };
      })
    );

    if (tasksWithSubmission.length > 0) {
      groupedTasks.set(plan.id, {
        id: plan.id,
        title: plan.title,
        tasks: tasksWithSubmission,
      });
    }
  }

  return Array.from(groupedTasks.values());
}


export const searchFilter = (assignments, searchTerm) => {
  return assignments
    .map((assignment) => {
      const filteredTasks = assignment.tasks.filter(
        (task) =>
          task.name.toLowerCase().includes(searchTerm) ||
          (task.description || '').toLowerCase().includes(searchTerm)
      );

      if (filteredTasks.length > 0) {
        return {
          ...assignment,
          tasks: filteredTasks,
        };
      }
    })
    .filter(Boolean);
};
