import { useCallback, useEffect, useMemo, useState } from "react";

import FinanceAPI from "@/api/finance";
import { useGetAllUsers } from "@/hooks/query/academic/useGetAllUsers";

import { useGetAllUserBill } from "./useGetAllUserBill";

/**
 * Custom hook to fetch and format the rows for Tagihan
 * @returns {Object} - { finalRows, isLoading }
 */
export const useExportTagihanPenggunaData = () => {
  const { data: userBillData, isLoading: isUserBillLoading } =
    useGetAllUserBill({
      paginated: false,
    });
  const { data: userData, isLoading: isUserLoading } = useGetAllUsers({
    paginated: false,
  });
  const [finalRows, setFinalRows] = useState([]);

  const isLoading = isUserBillLoading || isUserLoading;

  const userBillDataWithName = useMemo(() => {
    if (!userBillData || !userData) return [];

    return userBillData.map((bill) => {
      const user = userData.find(({ id }) => id === bill.user_id);
      return {
        ...bill,
        user_name: user?.name || "Unknown",
        type: formatUserType(user?.type) || "Unknown",
      };
    });
  }, [userBillData, userData]);

  const fetchBillDetail = useCallback(async () => {
    if (userBillDataWithName.length === 0) return;

    const results = await Promise.all(
      userBillDataWithName.map(async (row) => {
        const { data: billDetailData } = await FinanceAPI.getBillById(
          row.bill_id
        );
        const { data: invoiceData } = await FinanceAPI.getAllInvoices({
          bill_id: row.bill_id,
        });

        if (billDetailData && invoiceData) {
          const billDetail = billDetailData.data;
          const invoice = invoiceData.data;

          const doneInvoices = invoice.filter(
            ({ status }) => status === "done"
          );

          const totalAmount = doneInvoices.reduce(
            (sum, invoice) => sum + invoice.amount,
            0
          );

          return {
            id: row.bill_id,
            custom_id: billDetail.custom_id,
            deadline: billDetail.deadline,
            user_name: row.user_name,
            type: row.type,
            payment_name: billDetail.name,
            amount: billDetail.amount,
            total_paid: totalAmount,
          };
        }
      })
    );

    setFinalRows((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(results)) {
        return results;
      }
      return prev;
    });
  }, [userBillDataWithName]);

  useEffect(() => {
    if (!isLoading && userBillDataWithName.length > 0) {
      fetchBillDetail();
    }
  }, [isLoading, userBillDataWithName, fetchBillDetail]);

  return { finalRows, isLoading };
};

const formatUserType = (type) => {
  switch (type) {
    case "staff":
      return "Staff";
    case "student":
      return "Siswa";
    case "teacher":
      return "Guru";
    default:
      return "";
  }
};
