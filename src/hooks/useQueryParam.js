"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair(s)
  const createQueryString = useCallback(
    (nameOrUpdates, value) => {
      const params = new URLSearchParams(searchParams.toString());

      // Handle multiple updates passed as an object
      if (typeof nameOrUpdates === "object" && nameOrUpdates !== null) {
        Object.entries(nameOrUpdates).forEach(([name, value]) => {
          value ? params.set(name, value) : params.delete(name);
        });
      }
      // Handle single update passed as name and value
      else if (typeof nameOrUpdates === "string") {
        value ? params.set(nameOrUpdates, value) : params.delete(nameOrUpdates);
      }

      return params.toString();
    },
    [searchParams]
  );

  const updateQueryParam = (nameOrUpdates, value) => {
    const queryString = createQueryString(nameOrUpdates, value);
    return router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return { updateQueryParam, createQueryString };
};
