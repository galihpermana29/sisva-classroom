"use client";
import React from "react";
import { ModalProvider } from "../../../class/[slug]/create-rpp/view/container/Provider/ModalProvider";
import TeachingMaterialContainer from "./TeachingMaterialContainer";

const TeachingMaterialMainPage = ({ initialData }) => {
  return (
    <ModalProvider>
      <TeachingMaterialContainer initialData={initialData} />
    </ModalProvider>
  );
};

export default TeachingMaterialMainPage;
