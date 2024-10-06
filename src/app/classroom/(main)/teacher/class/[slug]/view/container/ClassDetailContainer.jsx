"use client";
import React from "react";
import ClassDetailTabs from "@/app/classroom/shared/presentation/Tabs/ClassDetailTabs";
import { ModalProvider } from "../../create-rpp/view/container/Provider/ModalProvider";

const ClassDetailContainer = () => {
  return (
    <ModalProvider>
      <ClassDetailTabs />
    </ModalProvider>
  );
};

export default ClassDetailContainer;
