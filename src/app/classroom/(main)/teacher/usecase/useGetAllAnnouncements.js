import { useEffect, useState } from "react";
import { getAllAnnouncements } from "../repositories/apiService";


export const useGetAllAnnouncements = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const announcements = await getAllAnnouncements();
        setData(announcements);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isLoading,
    error,
    data,
  };
};
