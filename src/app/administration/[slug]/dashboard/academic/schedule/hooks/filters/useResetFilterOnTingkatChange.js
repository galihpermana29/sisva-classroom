"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { KELAS_FIELD_NAME } from "../../components/filters/KelasSelect";

export const useResetFilterOnTingkatChange = (tingkat) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (!tingkat) return; // prevent this effect from running if tingkat is removed because of changes in other previous filter

    params.delete(KELAS_FIELD_NAME);
    return router.replace(pathname + "?" + params.toString());
  }, [tingkat]);
};
