"use client";

import { useMounted } from "@mantine/hooks";
import { useGetTagihan } from "../../hooks/useGetTagihan";
import { Paginations } from "../paginations";

export const TagihanPagination = () => {
  const mounted = useMounted();
  const { totalPage, isLoading } = useGetTagihan();

  if (isLoading || !mounted) return null;

  return <Paginations totalPage={totalPage} />;
};
