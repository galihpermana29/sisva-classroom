import { useQuery } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";
import type { UserBill } from "@/types/apiTypes";

export const useUserBills = () => {
  return useQuery<UserBill[]>({
    queryKey: ["user-bills"],
    queryFn: async () => (await FinanceAPI.getAllUserBill()).data.data,
    placeholderData: [],
  });
};
