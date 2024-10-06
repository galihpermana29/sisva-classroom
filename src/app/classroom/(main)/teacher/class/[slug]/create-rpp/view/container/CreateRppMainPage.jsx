"use client";
import React from "react";
import { ModalProvider } from "./Provider/ModalProvider";
import CreateRppContainer from "./CreateRppContainer";

const CreateRppMainPage = ({
  initialData,
  headerText = "Tambah Rencana Pembelajaran Kelas:",
}) => {
  return (
    <ModalProvider>
      <CreateRppContainer initialData={initialData} headerText={headerText} />
    </ModalProvider>
  );
};

export default CreateRppMainPage;
