import { getAllAnnouncements } from "../repository/apiService";

export async function useGetStudentAnnouncement() {
  const announcements = await getAllAnnouncements();
  return announcements;
}
