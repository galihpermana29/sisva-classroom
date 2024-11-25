import { useEffect, useState } from "react";

import { getAllAnnouncements } from "../repositories/apiService";

export const useGetAllAnnouncements = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const {
        data: announcements,
        message,
        success,
      } = await getAllAnnouncements();

      if (!success) {
        setError(message);
        setIsLoading(false);
        return;
      }

      const filtered = announcements.filter(
        (announcement) => 
          announcement.target_user_types.includes("staff")
      );
      setData(announcements);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return {
    isLoading,
    error,
    data,
  };
};
