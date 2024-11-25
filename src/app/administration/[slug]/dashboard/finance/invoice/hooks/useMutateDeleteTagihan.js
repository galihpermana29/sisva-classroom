import { useMutation } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";

function useMutateDeleteTagihan(handleClose, refetch) {
  const deleteTagihan = async (id) => {
    const res = await FinanceAPI.deleteBill(id);

    return res;
  };

  const res = useMutation({
    mutationFn: (id) => {
      return deleteTagihan(id);
    },
    onSuccess: () => {
      refetch();
      handleClose();
    },
  });

  return res;
}

export default useMutateDeleteTagihan;
