"use client";

import { useGetUserById } from "@/hooks/query/user/useGetUserById";

import { useFilterStatus } from "./useFilterStatus";

export const useCheckCariFilter = (user_id) => {
  const { cari } = useFilterStatus();
  const { data } = useGetUserById(user_id);

  if (!cari) return true;
  if (!data) return true;

  return data.name.toLowerCase().includes(cari.toLowerCase());
};
