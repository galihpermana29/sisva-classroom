"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PRODI_FIELD_NAME } from "../../components/filters/ProdiSelect";
import { TINGKAT_FIELD_NAME } from "../../components/filters/TingkatSelect";
import { KELAS_FIELD_NAME } from "../../components/filters/KelasSelect";
import { GURU_FIELD_NAME } from "../../components/filters/GuruSelect";

export const useResetFilterOnPeriodeChange = (periode) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    params.delete(PRODI_FIELD_NAME);
    params.delete(TINGKAT_FIELD_NAME);
    params.delete(KELAS_FIELD_NAME);
    params.delete(GURU_FIELD_NAME);

    return router.replace(pathname + "?" + params.toString());
  }, [periode]);
};
