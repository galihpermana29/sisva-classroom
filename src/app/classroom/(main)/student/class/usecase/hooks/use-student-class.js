import { useEffect, useState } from "react";

import { useDebounce } from "use-debounce";
import { getUserDataCookie } from "../../../../teacher/usecase/getUserDataCookie";
import { getUserById } from "../../../repository/apiService";
import {
    getAllClasses,
    getAllStudentsInStudentGroups,
    getAllTaskByClassId,
} from "../../repository/student-class-service";
import {
    createDropdown,
    filterJoinedGroups,
    matchClassesToGroups,
    searchFilter,
} from "../data-mapper-service";
import { isOverdue } from "../date-helper";

export const useStudentClass = () => {
  const [initialClasses, setInitialClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: userId } = getUserDataCookie();

  const initialFilter = {
    subject: "",
    teacherName: "",
    search: "",
  };
  const [filter, setFilter] = useState(initialFilter);
  const [dropdownFilterData, setDropdownFilterData] = useState({
    subject: [],
    teacherName: [],
  });
  const [debouncedFilter] = useDebounce(filter, 500);

  async function fetchClasses() {
    try {
      setIsLoading(true);
      const [studentsResponse, classesResponse] = await Promise.all([
        getAllStudentsInStudentGroups(),
        getAllClasses(),
      ]);

      const { data: studentsInGroups, success: successStudents } =
        studentsResponse;
      const { data: allClasses, success: successClasses } = classesResponse;

      if (!successStudents || !successClasses) {
        throw new Error("Failed to fetch data.");
      }

      const joinedGroups = filterJoinedGroups(studentsInGroups, userId);
      const joinedClasses = matchClassesToGroups(allClasses, joinedGroups);

      if (!joinedClasses.length) {
        setClasses([]);
      } else {
        const classesWithTasks = await fetchTasksForClasses(joinedClasses);
        setInitialClasses(classesWithTasks);
        setClasses(classesWithTasks);

        setDropdownFilterData({
          subject: createDropdown(
            classesWithTasks,
            "subject_name",
            "subject_id"
          ),
          teacherName: createDropdown(
            classesWithTasks,
            "teacher_name",
            "teacher_id"
          ),
        });
      }
    } catch (error) {
      setError("An error occurred while fetching classes or tasks.");
      console.error("Error fetching classes or tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFilterChange = (name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleClearFilter = () => {
    setFilter(initialFilter);
  };

  useEffect(() => {
    const filterClasses = () => {
      let filteredClasses = initialClasses;

      if (debouncedFilter.search) {
        filteredClasses = searchFilter(
          classes,
          debouncedFilter.search.toLowerCase()
        );
      } else {
        if (debouncedFilter.subject) {
          filteredClasses = filteredClasses.filter(
            (classItem) => classItem.subject_id === debouncedFilter.subject
          );
        }
        if (debouncedFilter.teacherName) {
          filteredClasses = filteredClasses.filter(
            (classItem) => classItem.teacher_id === debouncedFilter.teacherName
          );
        }
      }

      setClasses(filteredClasses);
    };

    filterClasses();
  }, [debouncedFilter]);

  useEffect(() => {
    fetchClasses();
  }, []);

  return {
    classes,
    isLoading,
    error,
    dropdownFilterData,
    filter,
    handleFilterChange,
    handleClearFilter,
  };
};

const fetchTasksForClasses = async (classes) => {
  try {
    const tasksPromises = classes.map(async (classItem) => {
      const {
        data: tasks,
        success,
        message,
      } = await getAllTaskByClassId(classItem.id);
      const {
        data: teacherProfile,
        success: teacherSuccess,
        message: teacherMessage,
      } = await getUserById(classItem.teacher_id);

      if (!success) {
        throw new Error(message);
      }

      if (!teacherSuccess) {
        throw new Error(teacherMessage);
      }

      const filteredTasks =
        tasks.filter((task) => !isOverdue(task.deadline)) ?? [];

      return {
        ...classItem,
        tasks: filteredTasks,
        teacher_photo: teacherProfile.profile_image_uri,
      };
    });

    const classesWithTasks = await Promise.all(tasksPromises);
    return classesWithTasks;
  } catch (error) {
    throw new Error("Error fetching tasks for classes" + error);
  }
};
