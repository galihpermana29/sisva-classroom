import { useState, useEffect } from "react";
import { getAllAnnouncements } from "../repository/apiService";

export function useGetStudentAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const {
        data: announcements,
        success: announcementsResSucces,
        message: announcementsResMessage,
      } = await getAllAnnouncements();
      if (!announcementsResSucces) {
        setError(announcementsResMessage);
        setIsLoading(false);
        return;
      }
      setAnnouncements(announcements);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    announcements,
    error,
    isLoading,
  };
}
