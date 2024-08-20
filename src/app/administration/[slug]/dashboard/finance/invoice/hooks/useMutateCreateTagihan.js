import { FinanceAPI } from "@/api/finance";
import { useMutation } from "@tanstack/react-query";

function useMutateCreateTagihan(handleClose, refetch) {
  const createTagihan = async (payload) => {
    console.log(payload);
    // const res = await FinanceAPI.createBill(payload);

    // return res;
  };

  const res = useMutation({
    mutationFn: (payload) => {
      return createTagihan(payload);
    },
    onSuccess: () => {
      //   refetch();
      //   handleClose();
    },
  });

  return res;
}

export default useMutateCreateTagihan;
