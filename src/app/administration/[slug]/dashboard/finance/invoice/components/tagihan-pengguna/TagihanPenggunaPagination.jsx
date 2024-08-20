"use client";

import { useMounted } from "@mantine/hooks";
import { useGetTagihanPengguna } from "../../hooks/useGetTagihanPengguna";
import { Paginations } from "../paginations";

export const TagihanPenggunaPagination = () => {
  const mounted = useMounted();
  const { totalPage, isLoading } = useGetTagihanPengguna();

  if (isLoading || !mounted) return null;

  return <Paginations totalPage={totalPage} />;
};
