import { generalDateParser } from "@/app/classroom/shared/usecase/helper";

export function getClassByTeacherId(response, teacherId) {
  try {
    if (!response || !Array.isArray(response.data)) {
      return [];
    }
    return response.data.filter(
      (teacherClass) => teacherClass.teacher_id === teacherId
    );
  } catch (error) {
    console.error("Error in getClassByTeacherId:", error);
    return [];
  }
}

export function getClassById(response, id) {
  try {
    if (!response || !Array.isArray(response.data)) {
      return null;
    }
    return response.data.find((classItem) => classItem.id === id);
  } catch (error) {
    console.error("Error in getClassById:", error);
    return null;
  }
}

function findNearestDeadlineTask(tasks) {
  try {
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
  } catch (error) {
    console.error("Error in findNearestDeadlineTask:", error);
    return null;
  }
}

export function getClassWithScheduleList(scheduleList, classList) {
  try {
    return classList.map((teacherClass) => {
      const matchingSchedule = scheduleList.filter(
        (schedule) => schedule.class_id === teacherClass.id
      );

      return {
        ...teacherClass,
        schedule: matchingSchedule,
      };
    });
  } catch (error) {
    console.error("Error in getClassWithScheduleList:", error);
    return [];
  }
}

export function getUniqueClasses(allClasses) {
  try {
    return allClasses.filter(
      (class1, index, self) =>
        index ===
        self.findIndex(
          (class2) => class2.student_group_name === class1.student_group_name
        )
    );
  } catch (error) {
    console.error("Error in getUniqueClasses:", error);
    return [];
  }
}

export function searchFilter(filteredClassList, searchTerm) {
  try {
    return filteredClassList.filter(
      (classItem) =>
        classItem.subject_name.toLowerCase().includes(searchTerm) ||
        classItem.student_group_name.toLowerCase().includes(searchTerm) ||
        (classItem.nearest_task &&
          classItem.nearest_task.name.toLowerCase().includes(searchTerm))
    );
  } catch (error) {
    console.error("Error in searchFilter:", error);
    return [];
  }
}

export function createDropdown(dataList, name, value) {
  try {
    return dataList.map((data) => ({
      label: name ? data[name] : data,
      value: value ? data[value] : data,
    }));
  } catch (error) {
    console.error("Error in createDropdown:", error);
    return [];
  }
}
