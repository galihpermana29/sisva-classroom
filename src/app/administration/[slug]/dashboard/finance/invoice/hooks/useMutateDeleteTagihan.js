import { FinanceAPI } from "@/api/finance";
import { useMutation } from "@tanstack/react-query";

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
