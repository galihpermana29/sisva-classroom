"use client";

import { useQuery } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";
import { useGetAllUsers } from "@/hooks/query/academic/useGetAllUsers";
import { useBills } from "@/hooks/query/finance/useBills";
import { useUserBills } from "@/hooks/query/finance/useUserBills";
import { useUsers } from "@/hooks/query/user/useUsers";
import { segmentArray } from "@/utils/segmentArray";

import { usePagination } from "./usePagination";
import { useSortKey } from "./useSortKey";

export const useGetAllInvoices = ({
  bill_id,
  user_id,
  paginated = false,
  withSort = false,
}) => {
  const { rowsPerPage } = usePagination();
  const { data, ...query } = useQuery({
    queryKey: ["invoices", { user_id, bill_id }],
    queryFn: () => FinanceAPI.getAllInvoices({ user_id, bill_id }),
  });

  const queryResult = data ? data.data.data : undefined;

  const fields = useSortKey();
  const { data: userBills } = useUserBills();
  const { data: users } = useUsers();
  const { data: bills } = useBills();
  const queryData = withSort
    ? sortData({
        data: queryResult,
        fields,
        userBills,
        users,
        bills,
      })
    : queryResult;

  if (!paginated) {
    return { data: queryData, ...query };
  }

  const paginatedData = segmentArray(queryData, rowsPerPage);
  const totalPage = paginatedData.length > 0 ? paginatedData.length : 1;

  return { data: paginatedData, totalPage, ...query };
};

const sortData = ({ data, fields, userBills, users, bills }) => {
  return data?.sort((a, b) => {
    const userBillA = userBills?.find(
      (userBill) => userBill.id === a.user_bill_id
    );
    const userBillB = userBills?.find(
      (userBill) => userBill.id === b.user_bill_id
    );

    const userA = users?.find((user) => user?.id === userBillA?.user_id);
    const billA = bills?.find((bill) => bill?.id === userBillA?.bill_id);
    const userB = users?.find((user) => user?.id === userBillB?.user_id);
    const billB = bills?.find((bill) => bill?.id === userBillB?.bill_id);

    for (const field of fields) {
      let comparison = 0;

      switch (field) {
        case "id":
          comparison = a.id - b.id; // ascending order
          break;
        case "name":
          comparison = userA?.name.localeCompare(userB?.name) ?? comparison;
          break;
        case "category":
          comparison = billA?.name.localeCompare(billB?.name) ?? comparison;
          break;
        case "totalPrice":
          comparison = Boolean(billA && billB)
            ? billA.amount - billB.amount
            : comparison;
          break;
        case "amount":
          comparison = a.amount - b.amount; // descending order
          break;
        case "status":
          comparison = a.status.localeCompare(b.status); // ascending order
          break;
        default:
          break;
      }

      if (comparison !== 0) return comparison;
    }
    return 0;
  });
};
