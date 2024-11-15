import UsersAPI from "@/api/users";
import type { User } from "@/globalcomponents/BERespondTypes";
import { useQuery } from "@tanstack/react-query";

export const useStudents = () => {
  return useQuery<User[]>({
    queryKey: ["students"],
    queryFn: async () =>
      (await UsersAPI.getAllUsers("student")).data.data.filter(
        (student: User) => student.status === "active"
      ),
    placeholderData: [],
  });
};
