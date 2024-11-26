"use client";

import { useMounted } from "@mantine/hooks";

import useFilteredUserBills from "../../hooks/useFilteredUserBills";
import { useGetAllUserBill } from "../../hooks/useGetAllUserBill";
import { Paginations } from "../paginations";

export const TagihanPenggunaPagination = () => {
  const mounted = useMounted();
  const { totalPage, isLoading } = useGetAllUserBill({ paginated: true });
  const { filteredUserBills, isFetching } = useFilteredUserBills();
  console.log(filteredUserBills);

  if (isLoading || !mounted) return null;

  return <Paginations totalPage={totalPage} />;
};
