import type { UseQueryStateOptions } from "nuqs";
import { useQueryState } from "nuqs";

import type { InvoiceQueryKey } from "../utils/types";

export default function useInvoiceQueryState<T>(
  key: InvoiceQueryKey,
  options?: UseQueryStateOptions<T> & {
    defaultValue: T;
  }
) {
  return useQueryState(key, options);
}
