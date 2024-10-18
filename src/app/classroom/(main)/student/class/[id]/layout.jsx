"use client";

import { useGetDetailClass } from "../../../teacher/class/usecase/hooks/use-get-detail-class";

export default function DetailClassLayout({ children, params }) {
  const { id } = params;
  const { isLoading } = useGetDetailClass(id);

  return children;
}
