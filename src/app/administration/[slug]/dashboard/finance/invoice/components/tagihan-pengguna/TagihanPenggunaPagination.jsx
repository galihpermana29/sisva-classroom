"use client";

import usePaginatedFilteredUserBills from "../../hooks/usePaginatedFilteredUserBills";
import { Paginations } from "../paginations";

export const TagihanPenggunaPagination = () => {
  const { totalPage } = usePaginatedFilteredUserBills();

  return <Paginations totalPage={totalPage} />;
};
