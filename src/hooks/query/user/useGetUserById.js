"use client";

import UsersAPI from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (id, enabled = true) => {
  const { data, ...query } = useQuery({
    queryKey: ["user-id", { id }],
    queryFn: () => UsersAPI.getUserById(id),
    enabled,
  });

  const queryResult = data ? data.data.data : undefined;
  return { data: queryResult, ...query };
};
