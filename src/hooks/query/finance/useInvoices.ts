import { useQuery } from "@tanstack/react-query";

import FinanceAPI from "@/api/finance";
import type { Invoice } from "@/types/apiTypes";

export const useInvoices = () => {
  return useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: async () => (await FinanceAPI.getAllInvoices({})).data.data,
    placeholderData: [],
  });
};
