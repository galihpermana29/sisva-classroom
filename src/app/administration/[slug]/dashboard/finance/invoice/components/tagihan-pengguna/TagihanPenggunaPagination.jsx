"use client";

import { useMounted } from "@mantine/hooks";
import { useGetAllUserBill } from "../../hooks/useGetAllUserBill";
import { Paginations } from "../paginations";

export const TagihanPenggunaPagination = () => {
  const mounted = useMounted();
  const { totalPage, isLoading } = useGetAllUserBill({ paginated: true });

  if (isLoading || !mounted) return null;

  return <Paginations totalPage={totalPage} />;
};
