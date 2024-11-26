"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import FinanceAPI from "@/api/finance";
import { useBills } from "@/hooks/query/finance/useBills";
import { useInvoices } from "@/hooks/query/finance/useInvoices";
import { useUsers } from "@/hooks/query/user/useUsers";
import { paginateData } from "@/utils/paginateData";

import { usePagination } from "./usePagination";
import { useSortKey } from "./useSortKey";

export const useGetAllUserBill = ({
  bill_id,
  paginated = false,
  withSort = false,
}) => {
  const { rowsPerPage } = usePagination();
  const { data, ...query } = useQuery({
    queryKey: ["user-bill", bill_id],
    queryFn: () => FinanceAPI.getAllUserBill({ bill_id }),
  });

  const fields = useSortKey();
  const { data: users } = useUsers();
  const { data: bills } = useBills();
  const { data: invoices, isStale: invoicesIsStale } = useInvoices();
  const queryResult = data ? data.data.data : undefined;
  const queryData = withSort
    ? sortData({
        data: queryResult,
        fields,
        users,
        bills,
        invoices,
        invoicesIsStale,
      })
    : queryResult;
  if (!paginated) {
    return { data: queryData, ...query };
  }

  const paginatedData = paginateData(queryData, rowsPerPage);
  const totalPage = paginatedData.length > 0 ? paginatedData.length : 1;

  return { data: paginatedData, totalPage, ...query };
};

const sortData = ({
  data,
  fields,
  users,
  bills,
  invoices,
  invoicesIsStale,
}) => {
  const amountPaid = (invoices) => {
    const paidInvoices =
      invoices?.filter((invoice) => invoice.status === "done") ?? [];
    const amountPaid = paidInvoices.reduce(
      (acc, invoice) => acc + invoice.amount,
      0
    );

    return amountPaid;
  };

  return data?.sort((a, b) => {
    const userA = users?.find((user) => user?.id === a.user_id);
    const billA = bills?.find((bill) => bill?.id === a.bill_id);
    const invoicesA = invoices?.filter(
      (invoice) => invoice.user_bill_id === a.id
    );
    const amountPaidA = amountPaid(invoicesA);
    const deadlineA = billA
      ? dayjs(billA.deadline, "DD/MM/YYYY h:mm A Z").unix()
      : undefined;

    const userB = users?.find((user) => user?.id === b.user_id);
    const billB = bills?.find((bill) => bill?.id === b.bill_id);
    const invoicesB = invoices?.filter(
      (invoice) => invoice.user_bill_id === b.id
    );
    const amountPaidB = amountPaid(invoicesB);
    const deadlineB = billB
      ? dayjs(billB.deadline, "DD/MM/YYYY h:mm A Z").unix()
      : undefined;

    for (const field of fields) {
      let comparison = 0;

      switch (field) {
        case "id":
          comparison = a.id - b.id;
          break;
        case "deadline":
          comparison = Boolean(deadlineA && deadlineB)
            ? deadlineA - deadlineB
            : comparison;
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
        case "amountPaid":
          comparison = amountPaidA - amountPaidB;
          break;
        default:
          break;
      }

      if (comparison !== 0) return comparison;
    }
    return 0;
  });
};
