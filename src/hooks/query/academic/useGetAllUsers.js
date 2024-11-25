"use client";

import { useQuery } from "@tanstack/react-query";

import UsersAPI from "@/api/users";

export const useGetAllUsers = (params) => {
  const userTypes =
    params && params.types ? params.types.join() : "staff,teacher,student";
  const isEnabled = params && params.enabled ? params.enabled : true;
  const { data: result, ...query } = useQuery({
    queryKey: ["users", { type: userTypes }],
    queryFn: () => UsersAPI.getAllUsers(userTypes),
    enabled: isEnabled,
  });

  const data = result ? result.data.data : undefined;
  return { data, ...query };
};
