import { useEffect, useState, useMemo, useCallback } from "react";
import { FinanceAPI } from "@/api/finance";
import { useGetTagihan } from "./useGetTagihan";

/**
 * Custom hook to fetch and format the rows for Tagihan
 * @returns {Object} - { finalRows, isLoading }
 */
export const useExportTagihanData = () => {
  const { data: rows, isLoading } = useGetTagihan();
  const [finalRows, setFinalRows] = useState([]);

  const flatRows = useMemo(() => (rows ? rows.flat() : []), [rows]);

  const formattedRows = useMemo(
    () =>
      flatRows.map((row) => ({
        ...row,
        target_user_types: row.target_user_types.join(", "),
      })),
    [flatRows]
  );

  const fetchInvoices = useCallback(async () => {
    const results = await Promise.all(
      formattedRows.map(async (row) => {
        const { data } = await FinanceAPI.getAllInvoices({ bill_id: row.id });
        const invoicesData = data.data;

        const totalInvoiceLength = invoicesData.length;
        const paidInvoiceLength = invoicesData?.filter(
          ({ status }) => status === "done"
        ).length;

        return {
          ...row,
          total_paid: `${paidInvoiceLength}/${totalInvoiceLength}`,
        };
      })
    );

    setFinalRows((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(results)) {
        return results;
      }
      return prev;
    });
  }, [formattedRows]);

  useEffect(() => {
    if (formattedRows.length > 0) {
      fetchInvoices();
    }
  }, [formattedRows, fetchInvoices]);

  return { finalRows, isLoading };
};
