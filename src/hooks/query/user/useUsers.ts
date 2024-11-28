import { useQuery } from "@tanstack/react-query";

import UsersAPI from "@/api/users";
import type { User } from "@/types/apiTypes";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () =>
      (await UsersAPI.getAllUsers("staff,teacher,student")).data.data.filter(
        (student: User) => student.status === "active"
      ),
    placeholderData: [],
  });
};
