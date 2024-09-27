import { useEffect, useState } from "react";
import { getUserById } from "../repositories/apiService";
import { getCookie } from "cookies-next";

export const useGetUserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const {id: teacherId} = JSON.parse(getCookie("userData"))

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const {
        data: userProfile,
        message,
        success,
      } = await getUserById(teacherId);

      if (!success) {
        setError(message);
        setIsLoading(false);
        return;
      }

      setData(userProfile);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { isLoading, error, data };
};
