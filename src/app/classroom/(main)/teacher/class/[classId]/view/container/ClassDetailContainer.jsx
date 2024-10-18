"use client";
import React from "react";
import { ModalProvider } from "../../create-rpp/view/container/Provider/ModalProvider";
import ClassDetailTabs from "../presentation/Tabs/ClassDetailTabs";

const ClassDetailContainer = ({ initialData }) => {
  return (
    <ModalProvider>
      <div className="max-w-6xl mx-auto">
        <ClassDetailTabs initialData={initialData} />
      </div>
    </ModalProvider>
  );
};

export default ClassDetailContainer;
