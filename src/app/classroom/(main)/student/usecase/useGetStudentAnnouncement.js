import { useEffect, useState } from "react";
import { getAllAnnouncements } from "../repository/student";

export function useGetStudentAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    announcements,
    error,
    isLoading,
  };
}
