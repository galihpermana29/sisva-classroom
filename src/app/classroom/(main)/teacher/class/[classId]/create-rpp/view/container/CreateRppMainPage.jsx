"use client";
import React from "react";
import CreateRppContainer from "./CreateRppContainer";
import { ModalProvider } from "./Provider/ModalProvider";

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
