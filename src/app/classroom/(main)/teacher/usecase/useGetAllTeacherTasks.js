import { useEffect, useState } from 'react';

import {
  generalDateFormatter,
  isBefore,
} from '@/app/classroom/shared/usecase/helper';

import { isOverdue } from '../../student/class/usecase/date-helper';
import { getAllClasses, getTeacherTasks } from '../repositories/apiService';
import { getUserDataCookie } from './getUserDataCookie';

export const useGetAllTeacherTasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const { id: teacherId } = getUserDataCookie();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const {
        data: classes,
        message: messageClasses,
        success: successClasses,
      } = await getAllClasses();
      const {
        data: tasks,
        message: messageTasks,
        success: successTasks,
      } = await getTeacherTasks();

      if (!successClasses || !successTasks) {
        setError(messageClasses || messageTasks);
        setIsLoading(false);
        return;
      }

      const teachedClasses = classes?.filter(
        (classroom) => classroom.teacher_id == teacherId
      );
      const teacherTasks = tasks?.filter((task) =>
        teachedClasses.some((classroom) => classroom.id == task.class_id)
      );

      const finalData = teacherTasks
        ?.filter((task) => !isOverdue(task.deadline))
        ?.map((task) => {
          const { teacher_name, subject_name } =
            teachedClasses.find(
              (classroom) => classroom.id === task.class_id
            ) || {};
          return {
            ...task,
            teacher_name,
            subject_name,
          };
        });

      finalData.sort((a, b) => {
        return isBefore(a.deadline, b.deadline) ? -1 : 1;
      });

      setData(finalData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { isLoading, error, data };
};
