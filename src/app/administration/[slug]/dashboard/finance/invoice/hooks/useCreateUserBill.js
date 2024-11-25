"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";

export const useCreateUserBill = ({ billId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-user-bill", { billId }],
    mutationFn: async ({ userId, bundled = false }) => {
      if (!billId) return;
      if (bundled) {
        const data = await FinanceAPI.createUserBill({
          bill_id: billId,
          user_id: userId,
        });
        const userBillId = data.data.data;
        const billData = await FinanceAPI.getBillById(billId);
        const billAmount = billData.data.data?.amount ?? 0;
        if (!userBillId) return data;
        await FinanceAPI.createInvoice({
          user_bill_id: userBillId,
          status: "pending",
          amount: billAmount,
        });

        return data;
      }

      return FinanceAPI.createUserBill({
        bill_id: billId,
        user_id: userId,
      });
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "user-bill",
      }),
  });
};
