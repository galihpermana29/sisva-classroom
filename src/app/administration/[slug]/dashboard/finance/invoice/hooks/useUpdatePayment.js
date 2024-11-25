"use client";

import { useMutation } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";

export const useUpdatePayment = ({ invoiceId }) => {
  return useMutation({
    mutationKey: ["update-payment", { invoiceId }],
    mutationFn: (value) => {
      const paymentPayload = formatPaymentPayload(value);
      return FinanceAPI.updatePaymentProof(invoiceId, paymentPayload);
    },
    onSettled: () => {
      // ! queryClient is not defined
      // queryClient.refetchQueries({ queryKey: ["invoice", { id: invoiceId }] });
      // queryClient.refetchQueries({
      //   queryKey: ["invoices", { bill_id: undefined, user_id: undefined }],
      // });
    },
  });
};

const formatPaymentPayload = (value) => ({
  note: value?.payment_proof_note,
  uri: value?.payment_proof_uri,
});
