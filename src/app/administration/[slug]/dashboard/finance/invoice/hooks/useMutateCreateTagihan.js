import { useMutation } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";

function useMutateCreateTagihan(handleClose, refetch) {
  const createTagihan = async (payload) => {
    const res = await FinanceAPI.createBill(payload);

    return res;
  };

  const res = useMutation({
    mutationFn: (payload) => {
      return createTagihan(payload);
    },
    onSuccess: () => {
      refetch();
      handleClose();
    },
  });

  return res;
}

export default useMutateCreateTagihan;
