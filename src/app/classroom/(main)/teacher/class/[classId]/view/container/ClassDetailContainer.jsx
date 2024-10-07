"use client";
import React from "react";
import { ModalProvider } from "../../create-rpp/view/container/Provider/ModalProvider";
import ClassDetailTabs from "../presentation/Tabs/ClassDetailTabs";

const ClassDetailContainer = () => {
  return (
    <ModalProvider>
      <div className="max-w-6xl mx-auto -mt-16 mb-[8dvh] md:mb-0">
        <ClassDetailTabs />
      </div>
    </ModalProvider>
  );
};

export default ClassDetailContainer;
