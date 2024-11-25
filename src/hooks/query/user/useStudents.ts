import { useQuery } from "@tanstack/react-query";

import UsersAPI from "@/api/users";
import type { User } from "@/types/apiTypes";

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
