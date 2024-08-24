"use client";

import UsersAPI from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () => {
  const { data: result, ...query } = useQuery({
    queryKey: ["users"],
    queryFn: () => UsersAPI.getAllUsers(),
  });

  const data = result ? result.data.data : undefined;
  return { data, ...query };
};
