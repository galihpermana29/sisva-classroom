import { useState, useEffect } from "react";
import { getAllAnnouncements } from "../repository/apiService";

export function useGetStudentAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: announcements,
        success: announcementsResSucces,
        message: announcementsResMessage,
      } = await getAllAnnouncements();
      console.log(announcements, "announcement");
      if (!announcementsResSucces || !Array.isArray(announcements)) {
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
