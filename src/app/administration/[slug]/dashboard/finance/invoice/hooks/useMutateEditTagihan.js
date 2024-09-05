import { FinanceAPI } from "@/api/finance";
import { useMutation } from "@tanstack/react-query";

function useMutateEditTagihan(handleClose, refetch) {
  const editTagihan = async (payload) => {
    const { id, ...newPayload } = payload;

    const res = await FinanceAPI.updateBill(id, newPayload);

    return res;
  };

  const res = useMutation({
    mutationFn: (payload) => {
      return editTagihan(payload);
    },
    onSuccess: () => {
      refetch();
      handleClose();
    },
  });

  return res;
}

export default useMutateEditTagihan;
