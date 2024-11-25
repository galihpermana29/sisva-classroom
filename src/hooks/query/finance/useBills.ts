import { useQuery } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";
import type { Bill } from "@/types/apiTypes";

export const useBills = () => {
  return useQuery<Bill[]>({
    queryKey: ["bills"],
    queryFn: async () => (await FinanceAPI.getAllBills()).data.data,
    placeholderData: [],
  });
};
