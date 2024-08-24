"use client";

import { FinanceAPI } from "@/api/finance";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePayment = (id) => {
  return useMutation({
    mutationKey: ["update-payment", { id }],
    mutationFn: (payload) => FinanceAPI.updatePaymentProof(id, payload),
  });
};
