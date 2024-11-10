export function groupTaskByTeachingPlan(tasks, teachingPlans) {
  const groupedTasks = new Map();

  teachingPlans.forEach((plan) => {
    const matchedTasks = tasks.filter((task) =>
      plan.tasks?.some((planTask) => planTask.id === task.id)
    );

    if (matchedTasks.length > 0) {
      groupedTasks.set(plan.id, {
        id: plan.id,
        title: plan.title,
        tasks: matchedTasks,
      });
    }
  });

  return Array.from(groupedTasks.values());
}

export const searchFilter = (assignments, searchTerm) => {
  return assignments
    .map((assignment) => {
      const filteredTasks = assignment.tasks.filter(
        (task) =>
          task.name.toLowerCase().includes(searchTerm) ||
          (task.description || "").toLowerCase().includes(searchTerm)
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
