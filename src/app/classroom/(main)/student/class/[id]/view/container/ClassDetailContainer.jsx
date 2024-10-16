"use client";

import { useSearchParams } from "next/navigation";
import ClassDetailTabs from "../presentation/Tabs/ClassDetailTabs";

const ClassDetailContainer = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  return (
    <div
      className={`max-w-6xl mx-auto -mt-5 mb-[8dvh] md:mb-0 ${
        !tab && "hidden"
      }`}
    >
      <ClassDetailTabs />
    </div>
  );
};

export default ClassDetailContainer;
