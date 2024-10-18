export function useCalculateAverage(scores, taskId) {
  const taskScores = scores
    .filter((score) => score.task_id === taskId)
    .map((score) => score.value);
  const total = taskScores.reduce((sum, value) => sum + value, 0);
  return taskScores.length ? total / taskScores.length : 0;
}
