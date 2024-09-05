"use client";

import { useMounted } from "@mantine/hooks";
import { Paginations } from "../paginations";
import { useGetAllUserBill } from "../../hooks/useGetAllUserBill";

export const TagihanPenggunaPagination = () => {
  const mounted = useMounted();
  const { totalPage, isLoading } = useGetAllUserBill({ paginated: true });

  if (isLoading || !mounted) return null;

  return <Paginations totalPage={totalPage} />;
};
