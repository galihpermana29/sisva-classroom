import { FinanceAPI } from "@/api/finance";
import { useGetAllUsers } from "@/hooks/query/academic/useGetAllUsers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetAllInvoices } from "./useGetAllInvoices";
import { useGetAllUserBill } from "./useGetAllUserBill";

/**
 * Custom hook to fetch and format the rows for Tagihan
 * @returns {Object} - { finalRows, isLoading }
 */
export const useExportInvoiceData = () => {
  const { data: invoiceData, isLoading: isInvoiceLoading } = useGetAllInvoices({
    paginated: false,
  });
  const { data: userData, isLoading: isUserLoading } = useGetAllUsers({
    paginated: false,
  });
  const { data: userBillData, isLoading: isUserBillLoading } =
    useGetAllUserBill({
      paginated: false,
    });

  const [finalRows, setFinalRows] = useState([]);

  const isLoading = isInvoiceLoading || isUserLoading || isUserBillLoading;

  const invoiceDataWithBill = useMemo(() => {
    if (!invoiceData || !userBillData) return [];

    return invoiceData.map((invoice) => {
      const bill = userBillData.find(({ id }) => id === invoice.user_bill_id);

      return {
        ...invoice,
        bill_id: bill.bill_id,
        user_id: bill.user_id,
      };
    });
  }, [invoiceData, userBillData]);

  const invoiceDataWithName = useMemo(() => {
    if (!invoiceDataWithBill || !userData) return [];

    return invoiceDataWithBill.map((bill) => {
      const user = userData.find(({ id }) => id === bill.user_id);
      return {
        ...bill,
        user_name: user?.name || "Unknown",
        type: formatUserType(user?.type) || "Unknown",
      };
    });
  }, [invoiceDataWithBill, userData]);

  const fetchBillDetail = useCallback(async () => {
    if (invoiceDataWithName.length === 0) return;

    const results = await Promise.all(
      invoiceDataWithName.map(async (row) => {
        const { data: billDetailData } = await FinanceAPI.getBillById(
          row.bill_id
        );

        if (billDetailData) {
          const billDetail = billDetailData.data;

          return {
            id: row.id,
            name: row.user_name,
            type: row.type,
            payment_name: billDetail.name,
            amount: billDetail.amount,
            invoice_amount: row.amount,
            status: formatStatusType(row.status),
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
  }, [invoiceDataWithName]);

  useEffect(() => {
    if (!isLoading && invoiceDataWithName.length > 0) {
      fetchBillDetail();
    }
  }, [isLoading, invoiceDataWithName, fetchBillDetail]);

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

const formatStatusType = (type) => {
  switch (type) {
    case "done":
      return "Lunas";
    case "inreview":
      return "Verifikasi";
    case "pending":
      return "Pending";
    default:
      return "";
  }
};
