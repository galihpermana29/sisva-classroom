import { useEffect, useState } from "react";
import { getUserById } from "../repositories/apiService";

export const useGetUserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const subjects = await getUserById();
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
