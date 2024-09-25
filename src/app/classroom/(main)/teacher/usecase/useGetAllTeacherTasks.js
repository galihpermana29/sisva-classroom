import { useEffect, useState } from "react";
import { getTeacherTasksById } from "../repositories/apiService";

export const useGetAllTeacherTasks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
  
        try {
          const subjects = await getTeacherTasksById();
          setData(subjects);
        } catch (error) {
          setError(error);
        }
  
        setIsLoading(false);
      };
  
      fetchData();
    }, []);
  
    return { isLoading, error, data };
  };