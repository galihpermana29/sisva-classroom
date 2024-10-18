"use client";

import { useSearchParams } from "next/navigation";
import ClassDetailTabs from "../presentation/Tabs/ClassDetailTabs";
import { ModalProvider } from "@/app/classroom/(main)/teacher/class/[classId]/create-rpp/view/container/Provider/ModalProvider";

const ClassDetailContainer = ({ initialData }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  return (

    <ModalProvider>
      <div className={`max-w-6xl mx-auto mb-[8dvh] md:mb-0`}>
        <ClassDetailTabs initialData={initialData} />
      </div>
    </ModalProvider>
  );
};

export default ClassDetailContainer;
