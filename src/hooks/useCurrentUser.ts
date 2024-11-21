import UsersAPI from "@/api/users";
import type { User } from "@/types/BERespondTypes";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCurrentUser = (school_code?: string) => {
  const router = useRouter();
  const [userSession] = useLocalStorage<{
    school_id: string;
    token: string;
    user_id: string;
    username: string;
  }>({
    key: "user",
  });
  const userId = userSession?.user_id;
  const token = userSession?.token;

  return useQuery<User>({
    queryKey: ["curent-user", userId, token],
    queryFn: async () => {
      try {
        return (await UsersAPI.getUserById(userId)).data.data;
      } catch (error) {
        if (error.response.status === 401) {
          router.push(`/administration/${school_code}/auth/login`);
        }
        return null;
      }
    },
    enabled: !!userId,
  });
};
