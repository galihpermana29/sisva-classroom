import UsersAPI from "@/api/users";
import type { User } from "@/globalcomponents/BERespondTypes";
import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const useStaffTeachers = () => {
  return useQuery<User[]>({
    queryKey: ["staff,teachers"],
    queryFn: async () =>
      (await UsersAPI.getAllUsers("staff,teacher")).data.data.filter(
        (student: User) => student.status === "active"
      ),
  });
};

export const invalidateStaffTeachers = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["staff,teachers"] });
};
