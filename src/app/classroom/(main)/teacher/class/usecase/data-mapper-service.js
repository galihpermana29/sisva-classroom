import { generalDateParser } from "@/app/classroom/shared/usecase/helper";

export function getClassByTeacherId(response, teacherId) {
  return response.data.filter(
    (teacherClass) => teacherClass.teacher_id === teacherId
  );
}

export function getClassById(response, id) {
  return response.data.find((classItem) => classItem.id === id);
}

function findNearestDeadlineTask(tasks) {
  const now = new Date();

  return tasks.reduce((nearest, currentTask) => {
    const currentDeadline = generalDateParser(currentTask.deadline);

    if (currentDeadline <= now) {
      return nearest;
    }

    if (!nearest || currentDeadline < generalDateParser(nearest.deadline)) {
      return currentTask;
    }

    return nearest;
  }, null);
}

export function getClassWithTaskList(taskList, classList) {
  return classList.map((teacherClass) => {
    const matchingTasks = taskList.filter(
      (task) => task.class_id === teacherClass.id
    );

    const nearestTask = findNearestDeadlineTask(matchingTasks);

    return {
      ...teacherClass,
      nearest_task: nearestTask ? nearestTask : null,
    };
  });
}

export function getUniqueClasses(allClasses) {
  return allClasses.filter(
    (class1, index, self) =>
      index ===
      self.findIndex(
        (class2) => class2.student_group_name === class1.student_group_name
      )
  );
}

export function searchFilter(filteredClassList, searchTerm) {
  return filteredClassList.filter(
    (classItem) =>
      classItem.subject_name.toLowerCase().includes(searchTerm) ||
      classItem.student_group_name.toLowerCase().includes(searchTerm) ||
      (classItem.nearest_task &&
        classItem.nearest_task.name.toLowerCase().includes(searchTerm))
  );
}
export function createDropdown(dataList, name, value) {
  return dataList.map((data) => ({
    label: name ? data[name] : data,
    value: value ? data[value] : data,
  }));
}
