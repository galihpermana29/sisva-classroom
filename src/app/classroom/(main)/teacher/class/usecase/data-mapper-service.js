export function getClassByTeacherId(response, teacherId) {
  return response.data.filter(
    (teacherClass) => teacherClass.teacher_id === teacherId
  );
}

export function getClassById(response, id) {
  return response.data.find((classItem) => classItem.id === id);
}

function findNearestDeadlineTask(tasks) {
  const today = new Date();

  return tasks.reduce((nearest, currentTask) => {
    const currentDeadline = new Date(currentTask.deadline);

    if (currentDeadline < today) {
      return nearest;
    }

    if (!nearest || currentDeadline < new Date(nearest.deadline)) {
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
      task_list: nearestTask ? [nearestTask] : [],
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
      classItem.task_list.some((task) =>
        task.name.toLowerCase().includes(searchTerm)
      )
  );
}
export function createDropdown(dataList, name, value) {
  return dataList.map((data) => ({
    label: name ? data[name] : data,
    value: value ? data[value] : data,
  }));
}
