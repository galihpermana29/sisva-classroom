"use client";

import { useGetDetailClass } from "../usecase/hooks/use-get-detail-class";

export default function DetailClassLayout({ children, params }) {
  const classId = params.classId;
  const { isLoading } = useGetDetailClass(classId);

  return children;
}
