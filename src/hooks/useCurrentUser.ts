import UsersAPI from "@/api/users";
import type { User } from "@/globalcomponents/BERespondTypes";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const [userSession] = useLocalStorage<{
    school_id: string;
    token: string;
    user_id: string;
    username: string;
  }>({
    key: "user",
    defaultValue: null,
  });
  const userId = userSession?.user_id;

  return useQuery<User>({
    queryKey: ["curent-user", userId],
    queryFn: async () => (await UsersAPI.getUserById(userId)).data.data,
    enabled: !!userId,
  });
};
